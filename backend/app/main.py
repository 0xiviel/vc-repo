from fastapi import FastAPI
from app.routes import root
from app.models.schemas import Base
from app.settings import engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(root.router)
