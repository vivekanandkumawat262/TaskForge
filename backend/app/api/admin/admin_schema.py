from pydantic import BaseModel, EmailStr

class TaskMini(BaseModel):
    id: int
    title: str
    status: str

    model_config = {"from_attributes": True}


class ProjectMini(BaseModel):
    id: int
    name: str
    tasks: list[TaskMini] = []

    model_config = {"from_attributes": True}


class AssignedTaskMini(BaseModel):
    id: int
    title: str
    status: str
    project: ProjectMini | None

    model_config = {"from_attributes": True}


class AdminUserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    
    projects: list[ProjectMini] = []
    assigned_tasks: list[AssignedTaskMini] = []

    model_config = {"from_attributes": True}


# 🔥 REQUIRED FOR PYDANTIC v2
TaskMini.model_rebuild()
ProjectMini.model_rebuild()
AdminUserResponse.model_rebuild()
AssignedTaskMini.model_rebuild()