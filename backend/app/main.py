 
from fastapi import FastAPI
from  app.api.auth.auth_routes import router as auth_router
from app.db.database import Base, engine
from app.models import user   # IMPORTANT
from app.db.session import SessionLocal
from app.core.init_admin import create_admin_if_not_exists
from dotenv import load_dotenv
import os 
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(dotenv_path=".env", override=True)

print("ENV CHECK:", os.getenv("ADMIN_EMAIL"))

 
 
app = FastAPI()
 

# ✅ CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    print("🚀 Startup event running")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        create_admin_if_not_exists(db)
    finally:
        db.close()

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
