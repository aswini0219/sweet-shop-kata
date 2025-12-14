# Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using **Test-Driven Development (TDD)** principles.

This project demonstrates:

- Clean and readable code
- Clear business rules
- Backend REST APIs
- Frontend single-page application
- Authentication & role-based access
- Automated testing
- Responsible use of AI tools

The codebase is written so that even a **non-technical reviewer** can understand the intent and flow.

---

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite (persistent database)
- JWT Authentication
- Pytest (TDD)

### Frontend

- React
- Axios
- React Router

---

## Core Features

### Authentication & Roles

- User Registration
- User Login
- JWT-based authentication
- Role-based access control (Admin / User)

### Admin Capabilities

- Add new sweets
- Update sweet details
- Delete sweets
- Restock sweets
- Access Admin-only UI controls

### User Capabilities

- View available sweets
- Search & filter sweets
- Purchase sweets (disabled if out of stock)

---

## Admin Access (Important)

The system follows a **simple and transparent admin rule**:

> **The first two registered users are automatically assigned Admin privileges.**

To make evaluation easy, a **pre-configured Admin account** is already available.

### Pre-configured Admin Credentials

Use the following credentials to log in as an **Admin**:

Username: admin
Password: admin123

After logging in:

- Admin controls become visible
- Admin can add, update, delete, and restock sweets

> Any users registered **after the first two** are assigned the **User** role by default.

---

## Test-Driven Development (TDD)

This project follows **TDD principles**:

1. Write failing tests (Red)
2. Implement minimal code to pass tests (Green)
3. Refactor for clarity and readability

Due to learning FastAPI and full-stack development from scratch, TDD was applied primarily to **core backend flows**, with tests refined and expanded during development.

### Running Tests

```bash
python -m pytest
```

Covered test cases include:

Application startup

Sweet creation

Sweet listing

## Screenshots

Screenshots are provided to demonstrate the working application and user flows.

📁 Folder: /screenshots

## Included Screenshots

Login page

Registration page

Admin dashboard

Admin sweet management

Admin restock flow

Admin edit flow

Admin Search

User dashboard

User search

Purchase flow

## AI Usage Declaration

AI tools (ChatGPT) were used responsibly throughout the project for:

Understanding the assignment requirements

Designing API structures

Generating initial boilerplate

Debugging errors

Improving code readability

Reviewing and refining test cases

## All business logic, architectural decisions, and final implementations were:

Fully understood

Manually reviewed

Modified where necessary

Owned by the developer

AI was used as an assistant, not a replacement for understanding.

## How to Run the Project Locally

## Backend Setup

cd app
python -m venv venv
venv\Scripts\activate # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

## Backend runs at:

http://127.0.0.1:8000

## Frontend Setup

cd frontend
npm install
npm start

## Frontend runs at:

http://localhost:3000

## Submission Notes

Admin credentials are provided only for evaluation purposes

Screenshots are included for quick review

The project demonstrates backend, frontend, testing, and clean coding practices

AI usage is transparently documented

Thank you for reviewing this assignment.
