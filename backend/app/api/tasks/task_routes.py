from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from sqlalchemy import or_

from app.db.session import get_db
from app.models.task import Task
from app.models.user import User
from app.models.project import Project
from app.api.tasks.task_schema import TaskCreate, TaskResponse, TaskUpdate,TaskStatusUpdate, TaskAssign,AdminUserResponse
from app.core.security import get_current_user

router = APIRouter()


@router.post("/projects/{project_id}/tasks", response_model=TaskResponse, status_code=201)
def create_task(
    project_id: int,
    task_data: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 🔐 Validate assigned user
    if task_data.assigned_to_id:
        assigned_user = db.query(User).filter(User.id == task_data.assigned_to_id).first()
        if not assigned_user:
            raise HTTPException(
                status_code=404,
                detail="Assigned user not found"
            )

        # Optional rule: normal user cannot assign tasks to others
        if current_user.role != "admin" and task_data.assigned_to_id != current_user.id:
            raise HTTPException(
                status_code=403,
                detail="You cannot assign tasks to other users"
            )

    # 📁 Validate project
    if task_data.project_id:
        project = db.query(Project).filter(Project.id == task_data.project_id).first()
        if not project:
            raise HTTPException(
                status_code=404,
                detail="Project not found"
            )

    # ✅ Create task
    task = Task(
        title=task_data.title,
        description=task_data.description,
        priority=task_data.priority,
        status=task_data.status,
        due_date=task_data.due_date,

        assigned_to_id=task_data.assigned_to_id,
        created_by_id=current_user.id,
        project_id=project_id,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


# @router.get("/projects/{project_id}/tasks",response_model=List[TaskResponse])
# def get_tasks(
#     project_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     project = db.query(Project).filter(Project.id == project_id).first()

#     if not project:
#         raise HTTPException(status_code=404, detail="Project not found")

#     if project.owner_id != current_user.id:
#         raise HTTPException(status_code=403, detail="Not allowed")

#     return (
#         db.query(Task)
#         .filter(Task.project_id == project_id)
#         .order_by(Task.id.desc())
#         .all()
#     )

@router.get(
    "/projects/{project_id}/tasks",
    response_model=List[TaskResponse]
)
def get_tasks_for_project(
    project_id: int,
    search: Optional[str] = Query(
        None,
        description="Search tasks by title or description"
    ),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # ✅ Check project exists
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )

    # 🔐 Ownership check
    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not allowed to view tasks of this project"
        )

    # 🔍 Base query
    query = db.query(Task).filter(Task.project_id == project_id)

    # 🔎 SEARCH LOGIC (THIS IS THE KEY PART)
    if search:
        query = query.filter(
            or_(
                Task.title.ilike(f"%{search}%"),
                Task.description.ilike(f"%{search}%")
            )
        )

    tasks = query.order_by(Task.id.desc()).all()
    return tasks



@router.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task_by_id(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # 🔐 Ownership check (via project)
    if task.project.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not allowed to view this task"
        )

    return task



@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    if task_data.title is not None:
        task.title = task_data.title

    if task_data.description is not None:
        task.description = task_data.description

    if task_data.status is not None:
        task.status = task_data.status
   
    if task_data.priority is not None:
        task.priority = task_data.priority

    db.commit()
    db.refresh(task)

    return task


@router.delete("/tasks/{task_id}", status_code=200)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}



@router.patch("/tasks/{task_id}/status", status_code=200)
def update_task_status(
    task_id: int,
    data: TaskStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 🔍 Find task
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # 🔐 Permission check (owner or admin)
    if (
        task.project.owner_id != current_user.id
        and current_user.role != "admin"
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not allowed to update task status"
        )

    # ✅ Update status
    task.status = data.status

    db.commit()
    db.refresh(task)

    return {
        "message": "Task status updated successfully",
        "task_id": task.id,
        "status": task.status
    }



@router.patch("/tasks/{task_id}/assign", status_code=200)
def assign_task_to_user(
    task_id: int,
    data: TaskAssign,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 🔐 Admin-only access
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can assign tasks"
        )

    # 🔍 Find task
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # 🔍 Find user to assign
    print(data)
    user = db.query(User).filter(User.id == data.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # ✅ Assign task
    task.assigned_to_id = user.id

    db.commit()
    db.refresh(task)

    return {
        "message": "Task assigned successfully",
        "task_id": task.id,
        "assigned_to": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

