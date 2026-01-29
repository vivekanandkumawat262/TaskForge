from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional

from app.db.session import get_db
from app.models.project import Project
from app.models.user import User
from app.api.projects.project_schema import ProjectCreate, ProjectResponse, ProjectUpdate
from app.core.security import get_current_user

router = APIRouter()


@router.post("/", response_model=ProjectResponse, status_code=201)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = Project(
        name=project_data.name,
        description=project_data.description,
        owner_id=current_user.id
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


# -------------------- GET ALL PROJECTS --------------------
@router.get("/", response_model=List[ProjectResponse])
def get_projects(
    search: Optional[str] = Query(
        None,
        description="Search projects by name or description"
    ),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Base query: user's projects
    query = db.query(Project).filter(
        Project.owner_id == current_user.id
    )

    # 🔍 SEARCH SECTION (THIS IS WHAT YOU ASKED)
    if search:
        query = query.filter(
            or_(
                Project.name.ilike(f"%{search}%"),
                Project.description.ilike(f"%{search}%")
            )
        )

    return query.order_by(Project.id.desc()).all()

# @router.get("/", response_model=List[ProjectResponse])
# def get_projects(
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     projects = (
#         db.query(Project)
#         .filter(Project.owner_id == current_user.id)
#         .order_by(Project.id.desc())
#         .all()
#     )

#     return projects



@router.delete("/{project_id}", status_code=200)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
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
            detail="Not allowed to delete this project"
        )

    db.delete(project)
    db.commit()

    return {"message": "Project deleted successfully"}


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
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
            detail="Not allowed to update this project"
        )

    # ✅ Update only provided fields
    if project_data.name is not None:
        project.name = project_data.name

    if project_data.description is not None:
        project.description = project_data.description

    db.commit()
    db.refresh(project)

    return project
