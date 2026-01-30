from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.orm import selectinload
from typing import List

from app.db.session import get_db
from app.models.user import User
from app.models.project import Project
from app.models.task import Task
from app.core.security import get_current_user
from app.api.admin.admin_schema import AdminUserResponse

router = APIRouter()



@router.get("/users", response_model=list[AdminUserResponse])
def get_all_users(
    admin: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    users = (
        db.query(User)
        .options(
            selectinload(User.projects).selectinload(Project.tasks),
            selectinload(User.assigned_tasks).selectinload(Task.project)
        )
        .all()
    )
    return users


# @router.get("/users", response_model=List[AdminUserResponse])
# def get_all_users(
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     # 🔐 Admin check
#     if current_user.role != "admin":
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Admin access required"
#         )

#     users = db.query(User).order_by(User.id.asc()).all()
#     return users
