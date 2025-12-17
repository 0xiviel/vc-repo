from datetime import date

from fastapi_users import schemas
from pydantic import BaseModel


class UserRead(schemas.BaseUser[int]):
    username: str


class UserCreate(schemas.BaseUserCreate):
    username: str


class UserUpdate(schemas.BaseUserUpdate):
    username: str


class EquipmentBase(BaseModel):
    name: str
    description: str | None = None


class EquipmentCreate(EquipmentBase):
    pass


class EquipmentUpdate(EquipmentBase):
    pass


class EquipmentRead(EquipmentBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True


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


class BookingBase(BaseModel):
    date_from: date
    date_to: date
    workspace_id: int
    equipment_id: int | None = None
    user_id: int


class BookingCreate(BookingBase):
    pass


class BookingUpdate(BaseModel):
    date_from: date | None = None
    date_to: date | None = None
    workspace_id: int | None = None
    equipment_id: int | None = None


class BookingRead(BookingBase):
    id: int

    class Config:
        from_attributes = True


class AvailableWorkspaceRead(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class EquipmentUsageReportResponse(BaseModel):
    data: dict[str, dict[str, int]]
