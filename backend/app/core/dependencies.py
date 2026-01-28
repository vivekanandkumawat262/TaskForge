from fastapi import Depends, HTTPException, status
from app.models.user import User
from app.core.security import get_current_user

def require_user(current_user: User = Depends(get_current_user)):
    return current_user

def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user
