from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.workspace import Workspace


class WorkspaceCRUD:
    def __init__(self, db_session: AsyncSession) -> None:
        self.db_session = db_session

    async def create(self, name: str, description: Optional[str] = None) -> Workspace:
        """Create a new workspace"""
        workspace = Workspace(name=name, description=description)
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
    
    async def update(
        self,
        workspace_id: int,
        name: Optional[str] = None,
        description: Optional[str] = None,
    ) -> Optional[Workspace]:
        """Update a workspace"""
        workspace = await self.get(workspace_id)
        if workspace is None:
            return None
        if name is not None:
            workspace.name = name
        if description is not None:
            workspace.description = description
        await self.db_session.commit()
        await self.db_session.refresh(workspace)
        return workspace
    
    async def delete(self, workspace_id: int) -> bool:
        """Delete a workspace"""
        workspace = await self.get(workspace_id)
        if workspace is None:
            return False
        await self.db_session.delete(workspace)
        await self.db_session.commit()
        return True
