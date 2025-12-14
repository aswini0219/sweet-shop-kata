from fastapi import FastAPI
from database import engine
from app.database import Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Hello Sweet Shop"}
