import os
from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import get_password_hash

def create_admin_if_not_exists(db: Session):
    admin_email = os.getenv("ADMIN_EMAIL")
    admin_name = os.getenv("ADMIN_NAME")
    admin_password = os.getenv("ADMIN_PASSWORD")
    
    print("🔍 ADMIN_NAME:", admin_name)
    print("🔍 ADMIN_EMAIL:", admin_email)
    print("🔍 ADMIN_PASSWORD:", admin_password)
    
    if not admin_email or not admin_password:
      print("❌ Admin env vars not found. Skipping admin creation.")
      return

    admin = db.query(User).filter(User.email == admin_email).first()

    if admin:
        print("⚠️ Admin already exists:", admin.email)
        return

    new_admin = User(
        name=admin_name,
        email=admin_email,
        password=get_password_hash(admin_password),
        role="admin"
    )

    db.add(new_admin)
    db.commit()

    print("✅ Admin user created")
