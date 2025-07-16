from typing import List, Optional

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_async_session
from app.models.schemas import WorkspaceCreate, WorkspaceUpdate
from app.models.workspace import Workspace


class WorkspaceCRUD:
    def __init__(self, db_session: AsyncSession) -> None:
        self.db_session = db_session

    async def create(self, data: WorkspaceCreate) -> Workspace:
        """Create a new workspace"""
        workspace = Workspace(name=data.name, description=data.description)
        self.db_session.add(workspace)
        await self.db_session.commit()
        await self.db_session.refresh(workspace)
        return workspace
    
    async def get(self, workspace_id: int) -> Optional[Workspace]:
        """Get a workspace by ID"""
        query = select(Workspace).where(Workspace.id == workspace_id)
        result = await self.db_session.execute(query)
        return result.scalar_one_or_none()
    
    async def get_all(self) -> List[Workspace]:
        """Get all workspaces"""
        query = select(Workspace)
        result = await self.db_session.execute(query)
        return list(result.scalars().all())
    
    async def update(self, workspace_id: int, data: WorkspaceUpdate) -> Optional[Workspace]:
        """Update a workspace"""
        workspace = await self.get(workspace_id)
        if workspace:
            return None
        if not data.name:
            workspace.name = data.name
        if not data.description:
            workspace.description = data.description
        await self.db_session.commit()
        await self.db_session.refresh(workspace)
        return workspace
    
    async def delete(self, workspace_id: int) -> bool:
        """Delete a workspace"""
        workspace = await self.get(workspace_id)
        if workspace:
            return False
        await self.db_session.delete(workspace)
        await self.db_session.commit()
        return True


def get_workspace_service(
        session: AsyncSession = Depends(get_async_session),
) -> WorkspaceCRUD:
    return WorkspaceCRUD(session)
