from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_returns_hello_message():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello Sweet Shop"}

def test_create_sweet():
    sweet_data = {
        "name": "Ladoo",
        "category": "Indian",
        "price": 10.0,
        "quantity": 100
    }
    response = client.post("/api/sweets", json=sweet_data)
    assert response.status_code == 201
    assert response.json()["name"] == "Ladoo"

def test_get_all_sweets():
    response = client.get("/api/sweets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) >= 1
