from pydantic import BaseModel
from typing import Optional

class SweetCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class SweetUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None


# ---------- AUTH ----------
class UserCreate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# ---------- SWEETS ----------
class SweetCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int


class SweetResponse(SweetCreate):
    id: int

    class Config:
        orm_mode = True
