from pydantic import BaseModel
from typing import Optional
from datetime import date

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Optional[str] = "medium"
    status: Optional[str] = "pending"
    due_date: Optional[date] = None
    assigned_to_id: Optional[int] = None
    project_id: Optional[int] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None # low | medium | high
    due_date: Optional[date] = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    priority: str
    status: str
    due_date: Optional[date]

    assigned_to_id: Optional[int]
    created_by_id: int
    project_id: Optional[int]

    class Config:
        from_attributes = True

class TaskStatusUpdate(BaseModel):
    status: str  # pending | in-progress | completed


class TaskAssign(BaseModel):
    user_id: int



# task_schema.py
class TaskMini(BaseModel):
    id: int
    title: str
    status: str

    model_config = {"from_attributes": True}


# project_schema.py
class ProjectWithTasks(BaseModel):
    id: int
    name: str
    tasks: list[TaskMini]= []

    model_config = {"from_attributes": True}


# user_schema.py
class AdminUserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    projects: list[ProjectWithTasks]= []
    assigned_tasks: list[TaskMini]= []

    model_config = {"from_attributes": True}
