from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User

# 🔐 ONE SECRET KEY — NEVER CHANGE AFTER THIS
SECRET_KEY = "taskforge-super-secret-key"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})

    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    print("🔑 Token Received:", token)

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("📦 Payload:", payload)

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

    except JWTError as e:
        print("❌ JWT ERROR:", e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    user = db.query(User).filter(User.id == int(user_id)).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user



# from datetime import datetime, timedelta
# from jose import jwt, JWTError
# from passlib.context import CryptContext
# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from sqlalchemy.orm import Session
 

# from app.db.session import get_db
# from app.models.user import User

# SECRET_KEY = "CHANGE_THIS_SECRET"
# ALGORITHM = "HS256"


# pwd_context = CryptContext(
#     schemes=["argon2"],
#     deprecated="auto"
# )
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

 

# def get_password_hash(password: str) -> str:
#     return pwd_context.hash(password)

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)


# def create_access_token(data: dict, expires_delta: timedelta):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + expires_delta
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



# # 🔐 JWT constants (NO settings)
  

# def get_current_user(
#     token: str = Depends(oauth2_scheme),
#     db: Session = Depends(get_db)
# ):
#     print("🔑 Token Received:", token)

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         print("📦 JWT Payload:", payload)

#         user_id = payload.get("sub")
#         role = payload.get("role")

#         print("👤 user_id from token:", user_id)

#         if user_id is None:
#             raise HTTPException(status_code=401, detail="No sub in token")

#     except JWTError as e:
#         print("❌ JWT ERROR:", e)
#         raise HTTPException(status_code=401, detail="Invalid token")

#     user = db.query(User).filter(User.id == int(user_id)).first()
#     print("🧑 User from DB:", user)

#     if not user:
#         raise HTTPException(status_code=401, detail="User not found")

#     return user



# # # def get_current_user(
# # #     token: str = Depends(oauth2_scheme),
# # #     db: Session = Depends(get_db)
# # # ):
# # #     print("Token Received: ", token)
# # #     try:
# # #         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
# # #         user_id = payload.get("sub")
# # #         role: str = payload.get("role")

# # #         if user_id is None:
# # #             raise HTTPException(status_code=401)
# # #     except JWTError:
# # #         raise HTTPException(
# # #             status_code=status.HTTP_401_UNAUTHORIZED,
# # #             detail="Invalid token"
# # #         )

# # #     user = db.query(User).filter(User.id == int(user_id)).first()
# # #     if not user:
# # #         raise HTTPException(status_code=401)

# # #     return user
