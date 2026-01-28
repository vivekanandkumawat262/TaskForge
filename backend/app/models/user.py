from sqlalchemy import Column, Integer, String, Boolean
from app.db.database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False) 
    role = Column(String, default="user")  # admin | user
    is_active = Column(Boolean, default=True)

    projects = relationship("Project", back_populates="owner")
    
    # ✅ tasks assigned TO this user
    assigned_tasks = relationship(
        "Task",
        foreign_keys="Task.assigned_to_id",
        back_populates="assigned_to"
    )

    # ✅ tasks CREATED BY this user
    created_tasks = relationship(
        "Task",
        foreign_keys="Task.created_by_id",
        back_populates="created_by"
    )