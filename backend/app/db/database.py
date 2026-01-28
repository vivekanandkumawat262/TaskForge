
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

DATABASE_URL = "sqlite:///./taskforge.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # only for SQLite
)

Base = declarative_base()
