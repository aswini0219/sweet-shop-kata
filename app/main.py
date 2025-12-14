from fastapi import FastAPI, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.database import engine, get_db
from app.models import Base, Sweet
from app.schemas import SweetCreate

app = FastAPI()
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Hello Sweet Shop"}

@app.post("/api/sweets", status_code=status.HTTP_201_CREATED)
def create_sweet(sweet: SweetCreate, db: Session = Depends(get_db)):
    new_sweet = Sweet(
        name=sweet.name,
        category=sweet.category,
        price=sweet.price,
        quantity=sweet.quantity
    )
    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)
    return new_sweet

@app.get("/api/sweets")
def get_all_sweets(db: Session = Depends(get_db)):
    sweets = db.query(Sweet).all()
    return sweets
