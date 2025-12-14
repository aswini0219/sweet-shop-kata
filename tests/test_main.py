# tests/test_main.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app, create_access_token
from app.database import Base, get_db
from app.models import User, Sweet

# ================= TEST DATABASE SETUP =================
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override get_db dependency to use test DB
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Create all tables for testing
Base.metadata.create_all(bind=engine)

client = TestClient(app)

# ================= FIXTURE FOR ADMIN USER =================
@pytest.fixture(scope="module")
def admin_token():
    db = TestingSessionLocal()
    # Create admin user if not exists
    admin = db.query(User).filter(User.username == "admin").first()
    if not admin:
        admin = User(username="admin", hashed_password="$2b$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", is_admin=True)
        db.add(admin)
        db.commit()
        db.refresh(admin)
    db.close()
    # Generate JWT
    return create_access_token({"sub": "admin"})


# ================= TESTS =================
def test_root_returns_hello_message():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello Sweet Shop"}

def test_create_sweet(admin_token):
    headers = {"Authorization": f"Bearer {admin_token}"}
    sweet_data = {
        "name": "Ladoo",
        "category": "Indian",
        "price": 10.0,
        "quantity": 100
    }
    response = client.post("/api/sweets", json=sweet_data, headers=headers)
    assert response.status_code == 201
    assert response.json()["name"] == "Ladoo"
    assert response.json()["quantity"] == 100

def test_get_all_sweets():
    response = client.get("/api/sweets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_register_user():
    response = client.post("/api/auth/register", json={
        "username": "user1",
        "password": "password123"
    })
    assert response.status_code == 200

def test_login_user():
    response = client.post("/api/auth/login", json={
        "username": "user1",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_non_admin_cannot_create_sweet():
    token = create_access_token({"sub": "user1"})
    headers = {"Authorization": f"Bearer {token}"}

    response = client.post("/api/sweets", json={
        "name": "Barfi",
        "category": "Indian",
        "price": 15,
        "quantity": 20
    }, headers=headers)

    assert response.status_code == 403


def test_purchase_sweet(admin_token):
    headers = {"Authorization": f"Bearer {admin_token}"}

    # Create sweet
    res = client.post("/api/sweets", json={
        "name": "Jalebi",
        "category": "Indian",
        "price": 12,
        "quantity": 1
    }, headers=headers)

    sweet_id = res.json()["id"]

    # Purchase
    purchase = client.post(f"/api/sweets/{sweet_id}/purchase")
    assert purchase.status_code == 200
    assert purchase.json()["quantity"] == 0

def test_search_sweets_by_category():
    response = client.get("/api/sweets?category=Indian")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
