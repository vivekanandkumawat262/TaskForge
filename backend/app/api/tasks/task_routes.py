from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.task import Task
from app.models.user import User
from app.models.project import Project
from app.api.tasks.task_schema import TaskCreate, TaskResponse
from app.core.security import get_current_user

router = APIRouter()


@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(
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
        project_id=task_data.project_id,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task
