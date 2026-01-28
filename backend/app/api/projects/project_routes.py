from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.project import Project
from app.models.user import User
from app.api.projects.project_schema import ProjectCreate, ProjectResponse
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
