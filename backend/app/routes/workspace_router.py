from fastapi import APIRouter, Depends

from typing import List

from app.services.workspace import WorkspaceCRUD, get_workspace_service
from app.models.schemas import WorkspaceCreate, WorkspaceRead, WorkspaceUpdate
from app.services.user_manager import get_current_user, admin_only
from app.models.user import User


router = APIRouter(prefix="", tags=["workspace"])


@router.get("", response_model=List[WorkspaceRead])
async def get_all_workspaces(
    service: WorkspaceCRUD = Depends(get_workspace_service),
    _: User = Depends(get_current_user),
):
    """Get all workspaces - available to all authenticated users"""
    return await service.get_all()


@router.post("", response_model=WorkspaceRead)
async def create_workspace(
    data: WorkspaceCreate,
    service: WorkspaceCRUD = Depends(get_workspace_service),
    _: User = Depends(admin_only),  # Only admin can create
):
    """Create a new workspace - only available to admins"""
    return await service.create(data)


@router.get("/{workspace_id}", response_model=WorkspaceRead)
async def get_workspace_by_id(
    workspace_id: int,
    service: WorkspaceCRUD = Depends(get_workspace_service),
    _: User = Depends(get_current_user),
):
    """Get a workspace by ID - available to all authenticated users"""
    return await service.get(workspace_id)


@router.put("/{workspace_id}", response_model=WorkspaceRead)
async def update_workspace(
    workspace_id: int,
    data: WorkspaceUpdate,
    service: WorkspaceCRUD = Depends(get_workspace_service),
    _: User = Depends(admin_only),  # Only admin can update
):
    """Update a workspace - only available to admins"""
    return await service.update(workspace_id, data)


@router.delete("/{workspace_id}")
async def delete_workspace(
    workspace_id: int,
    service: WorkspaceCRUD = Depends(get_workspace_service),
    _: User = Depends(get_current_user),  # Only admin can delete
):
    """Delete a workspace - only available to admins"""
    return await service.delete(workspace_id)
