from fastapi_users import schemas
from pydantic import BaseModel

class UserRead(schemas.BaseUser[int]):
    username: str

class UserCreate(schemas.BaseUserCreate):
    username: str

class UserUpdate(schemas.BaseUserUpdate):
    username: str

class WorkspaceBase(BaseModel):
    name: str
    description: str | None = None

class WorkspaceCreate(WorkspaceBase):
    pass

class WorkspaceUpdate(BaseModel):
    name: str | None = None
    description: str | None = None

class WorkspaceRead(WorkspaceBase):
    id: int
    
    class Config:
        from_attributes = True
