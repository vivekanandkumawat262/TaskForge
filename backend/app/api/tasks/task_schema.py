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
