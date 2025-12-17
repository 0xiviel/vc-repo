import pytest
from unittest.mock import AsyncMock, MagicMock
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.workspace import Workspace
from app.services.workspace import WorkspaceCRUD


@pytest.mark.asyncio
async def test_create_workspace():
    # Create mock-session and test data
    mock_session = MagicMock(spec=AsyncSession)
    mock_session.commit = AsyncMock()
    mock_session.refresh = AsyncMock()
    crud = WorkspaceCRUD(mock_session)
    name = "Test Workspace"
    description = "Test Description"

    # create
    workspace = await crud.create(name, description)

    # check result
    assert isinstance(workspace, Workspace)
    assert workspace.name == name
    assert workspace.description == description
    mock_session.add.assert_called_once_with(workspace)
    mock_session.commit.assert_awaited_once()
    mock_session.refresh.assert_awaited_once_with(workspace)


@pytest.mark.asyncio
async def test_get_workspace_found():
    mock_session = MagicMock(spec=AsyncSession)
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = Workspace(id=1, name="Test")
    mock_session.execute = AsyncMock(return_value=mock_result)
    crud = WorkspaceCRUD(mock_session)

    # get
    workspace = await crud.get(1)

    # check result
    assert workspace is not None
    assert workspace.id == 1
    mock_session.execute.assert_awaited_once()


@pytest.mark.asyncio
async def test_get_workspace_not_found():
    mock_session = MagicMock(spec=AsyncSession)
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_session.execute = AsyncMock(return_value=mock_result)
    crud = WorkspaceCRUD(mock_session)

    # get
    workspace = await crud.get(999)

    # check result
    assert workspace is None
    mock_session.execute.assert_awaited_once()


@pytest.mark.asyncio
async def test_get_all_workspaces():
    mock_session = MagicMock(spec=AsyncSession)
    mock_result = MagicMock()
    mock_scalars = MagicMock()
    mock_scalars.all.return_value = [
        Workspace(id=1, name="First"),
        Workspace(id=2, name="Second"),
    ]
    mock_result.scalars.return_value = mock_scalars
    mock_session.execute = AsyncMock(return_value=mock_result)
    crud = WorkspaceCRUD(mock_session)

    # get_all
    workspaces = await crud.get_all()

    # check results
    assert len(workspaces) == 2
    assert workspaces[0].name == "First"
    assert workspaces[1].name == "Second"
    mock_session.execute.assert_awaited_once()


@pytest.mark.asyncio
async def test_update_workspace_success():
    mock_session = MagicMock(spec=AsyncSession)
    mock_session.commit = AsyncMock()
    mock_session.refresh = AsyncMock()
    crud = WorkspaceCRUD(mock_session)

    # get
    existing_workspace = Workspace(id=1, name="Old", description="Old Desc")
    crud.get = AsyncMock(return_value=existing_workspace)

    # update
    updated_workspace = await crud.update(1, name="Updated", description="New Desc")

    # check results
    assert updated_workspace == existing_workspace
    assert existing_workspace.name == "Updated"
    assert existing_workspace.description == "New Desc"
    crud.get.assert_awaited_once_with(1)
    mock_session.commit.assert_awaited_once()
    mock_session.refresh.assert_awaited_once_with(existing_workspace)


@pytest.mark.asyncio
async def test_update_workspace_not_found():
    mock_session = MagicMock(spec=AsyncSession)
    crud = WorkspaceCRUD(mock_session)
    crud.get = AsyncMock(return_value=None)  # Workspace not found

    # update
    result = await crud.update(999, name="Should Fail")

    # check results
    assert result is None
    crud.get.assert_awaited_once_with(999)
    mock_session.commit.assert_not_awaited()
    mock_session.refresh.assert_not_awaited()


@pytest.mark.asyncio
async def test_delete_workspace_success():
    mock_session = MagicMock(spec=AsyncSession)
    mock_session.commit = AsyncMock()
    crud = WorkspaceCRUD(mock_session)

    # get
    workspace_to_delete = Workspace(id=1, name="To Delete")
    crud.get = AsyncMock(return_value=workspace_to_delete)

    # delete
    result = await crud.delete(1)

    # check results
    assert result is True
    crud.get.assert_awaited_once_with(1)
    mock_session.delete.assert_called_once_with(workspace_to_delete)
    mock_session.commit.assert_awaited_once()


@pytest.mark.asyncio
async def test_delete_workspace_not_found():
    mock_session = MagicMock(spec=AsyncSession)
    crud = WorkspaceCRUD(mock_session)
    crud.get = AsyncMock(return_value=None)  # Workspace not found

    # delete
    result = await crud.delete(999)

    # check result
    assert result is False
    crud.get.assert_awaited_once_with(999)
    mock_session.delete.assert_not_called()
    mock_session.commit.assert_not_awaited()
