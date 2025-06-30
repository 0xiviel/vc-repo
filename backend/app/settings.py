from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    DATABASE_URL: str = f"sqlite+aiosqlite:///{BASE_DIR / 'test.db'}"
    SECRET_KEY: str = "super-secret"


settings = Settings()
