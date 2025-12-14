from fastapi import FastAPI, Depends, HTTPException, status, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional, List

from app.database import engine, get_db
from app.models import Base, Sweet, User
from app.schemas import SweetCreate, SweetUpdate, UserCreate, Token

# ================= CONFIG =================
SECRET_KEY = "sweetshop-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ================= APP =================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# ================= ROOT =================
@app.get("/")
def read_root():
    return {"message": "Hello Sweet Shop"}

# ================= HELPERS =================
def hash_password(password: str):
    if len(password) > 72:  # bcrypt limit
        password = password[:72]
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    authorization: str = Header(...),
    db: Session = Depends(get_db),
):
    try:
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except (JWTError, IndexError):
        raise HTTPException(status_code=401, detail="Invalid token")

# ================= AUTH =================
@app.post("/api/auth/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_pw = hash_password(user.password)

    # First 2 users automatically become admins
    admin_count = db.query(User).filter(User.is_admin == True).count()
    is_admin = True if admin_count < 2 else False

    new_user = User(
        username=user.username,
        hashed_password=hashed_pw,
        is_admin=is_admin
    )
    db.add(new_user)
    db.commit()
    return {"message": "User registered", "is_admin": is_admin}

@app.post("/api/auth/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": db_user.username})
    
    # RETURN is_admin EXPLICITLY (no response_model to avoid restriction)
    return {
        "access_token": token,
        "token_type": "bearer",
        "is_admin": db_user.is_admin
    }
# ================= SWEETS =================
@app.get("/api/sweets")
def get_all_sweets(
    db: Session = Depends(get_db),
    name: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
):
    query = db.query(Sweet)
    if name:
        query = query.filter(Sweet.name.ilike(f"%{name}%"))
    if category:
        query = query.filter(Sweet.category.ilike(f"%{category}%"))
    if min_price is not None:
        query = query.filter(Sweet.price >= min_price)
    if max_price is not None:
        query = query.filter(Sweet.price <= max_price)
    return query.all()

@app.post("/api/sweets", status_code=status.HTTP_201_CREATED)
def create_sweet(
    sweet: SweetCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin only")
    new_sweet = Sweet(**sweet.dict())
    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)
    return new_sweet

@app.put("/api/sweets/{sweet_id}")
def update_sweet(
    sweet_id: int,
    sweet: SweetUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin only")
    db_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not db_sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    for key, value in sweet.dict(exclude_unset=True).items():
        setattr(db_sweet, key, value)
    db.commit()
    db.refresh(db_sweet)
    return db_sweet

@app.delete("/api/sweets/{sweet_id}", status_code=204)
def delete_sweet(
    sweet_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin only")
    db_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not db_sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    db.delete(db_sweet)
    db.commit()
    return {"detail": "Deleted"}

# ================= INVENTORY =================
@app.post("/api/sweets/{sweet_id}/purchase")
def purchase_sweet(sweet_id: int, db: Session = Depends(get_db)):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet or sweet.quantity <= 0:
        raise HTTPException(status_code=400, detail="Out of stock")
    sweet.quantity -= 1
    db.commit()
    return sweet

@app.post("/api/sweets/{sweet_id}/restock")
def restock_sweet(
    sweet_id: int,
    amount: int = Query(..., gt=0),  # Require positive amount
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin only")
    db_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not db_sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    db_sweet.quantity += amount
    db.commit()
    db.refresh(db_sweet)
    return db_sweet