# Sweet Shop Management System

A full‑stack Sweet Shop Management System built using **Test‑Driven Development (TDD)** principles.
This project demonstrates clean code, clear business rules, backend APIs, frontend UI, authentication, and testing.

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pytest (TDD)

### Frontend

- React
- Axios
- React Router

---

## Core Features

### Authentication & Roles

- User Registration & Login
- JWT‑based authentication
- **Automatic Admin assignment for the first two registered users**

### Admin Capabilities

- Add sweets
- Update sweets
- Delete sweets
- Restock sweets
- Access Admin‑only controls

### User Capabilities

- View sweets
- Search & filter sweets
- Purchase sweets (if in stock)

---

## Admin Access (Important)

The system follows a simple admin rule:

> **The first two users who register are automatically assigned Admin privileges.**

To make evaluation easy, an **admin account is already available**.

### Pre‑configured Admin Credentials

Use the following credentials to log in as an **Admin**:

```
Username: admin
Password: admin123
```

After logging in:

- Admin controls become visible
- Admin can add, update, delete, and restock sweets

> Any users registered **after the first two** will be **regular users** by default.

---

## Test‑Driven Development (TDD)

This project follows **TDD principles**:

1. Write failing tests (Red)
2. Implement minimal code to pass tests (Green)
3. Refactor for clarity

### Running Tests

```bash
pytest
```

All core API flows are covered with tests:

- Application startup
- Sweet creation
- Sweet listing

---

## Screenshots

Screenshots are provided to demonstrate:

- Admin login
- Admin dashboard
- Adding sweets
- Sweet listing & search
- User purchase flow

📁 **Location:**

```
/screenshots
```

Each screenshot is named clearly for easy understanding.

---

## AI Usage Declaration

AI tools (ChatGPT) were used **responsibly** for:

- Clarifying requirements
- Structuring the project
- Improving readability and code clarity
- Reviewing test cases

All design decisions, implementation, and testing logic were **understood, verified, and executed by the developer**.

---

## How to Run the Project

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## Submission Notes

- Admin credentials are provided **only for evaluation purposes**
- Screenshots are included for quick review
- Project follows clean code & TDD principles

Thank you for reviewing this assignment
