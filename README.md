
# 🚀 TaskForge – Full Stack Project & Task Management System

TaskForge is a **role-based project and task management web application** built with **FastAPI (backend)** and **React + Tailwind CSS (frontend)**.  
It enables teams to manage projects, assign tasks, track progress, and enforce role-based access similar to tools like **Jira, Asana, or Trello**.

---

## 🧠 Key Highlights

- 🔐 JWT Authentication with secure password hashing (Argon2)
- 👥 Role-based access control (Admin & User)
- 📁 Project management (CRUD + search)
- ✅ Task management with assignment, status updates, priority & due dates
- 🧾 Admin dashboard with user, project & task visibility
- 📊 User dashboard showing assigned tasks & progress
- ⚡ FastAPI backend with clean architecture
- 🎨 Modern React frontend with Tailwind CSS
- 🔁 Persistent login using JWT stored in localStorage

---

## 🏗️ Tech Stack

### Backend
- FastAPI
- SQLAlchemy (ORM)
- SQLite
- JWT (python-jose)
- Argon2 password hashing
- Pydantic v2
- Uvicorn

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- Context API (Auth)
- Protected routes (role-based)

---

## 📂 Project Structure
```bash
TaskForge/
├── backend/
│ ├── app/
│ │ ├── api/
│ │ │ ├── auth/
│ │ │ ├── tasks/
│ │ │ ├── projects/
│ │ │ └── admin/
│ │ ├── core/
│ │ ├── db/
│ │ ├── models/
│ │ └── main.py
│ ├── requirements.txt
│ └── taskforge.db
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── layouts/
│ │ ├── api/
│ │ ├── auth/
│ │ └── routes/
│ ├── package.json
│ └── vite.config.js
│
└── README.md

```
---

## 🔐 Roles & Permissions

### 👤 User
- Register & login
- Create projects
- Create tasks within owned projects
- View & update assigned tasks
- Update task status
- View personal dashboard

### 🛡️ Admin
- View all users
- View all projects & tasks
- Assign tasks to users
- Update any task status
- Full system visibility

---

## ⚙️ Backend Setup

```bash
1️⃣ Create Virtual Environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Environment Variables (.env)
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@taskforge.com
ADMIN_PASSWORD=admin123

4️⃣ Run Backend
uvicorn app.main:app --reload
📍 Backend runs at:

http://localhost:8000

```

## 🌐 Frontend Setup
```bash
1️⃣ Install Dependencies
npm install

2️⃣ Run Frontend
npm run dev
📍 Frontend runs at: 
http://localhost:5173

```

## 🔑 Default Admin Credentials

Created automatically on backend startup:

- Email: admin@taskforge.com
- Password: admin123


## 🔌 API Overview (Core Routes)
### Authentication
| Route	| Method   |  Description | 
|------|---------|----------------|
|`/api/auth/register`|POST|Register user|
|`/api/auth/login`|POST|Login user|
|`/api/auth/me`|GET|Current user|
		
		
		
### Projects

| Route	| Method   |  Description | 
|------|---------|----------------|
|`/api/projects`|GET|List projects (search supported)|
|`/api/projects`|POST|Create project|
|`/api/projects/{id}`|PUT	|Update project|
|`/api/projects/{id}`|DELETE	|Delete project|

  
	
	
### Tasks

| Route	| Method   |  Description | 
|------|---------|----------------|
|`/api/projects/{id}/tasks`|POST|	Create task|
|`/api/projects/{id}/tasks`|GET|List tasks (search supported)|
|/api/tasks/{id}	`|PUT	|Update task|
|`/api/tasks/{id}`|DELETE	|Delete task|
|`/api/tasks/{id}/status`|PATCH		|Update status|
|`/api/tasks/{id}/assign`|PATCH		|Assign task (Admin only)|


  
	
### Admin

| Route	| Method   |  Description | 
|------|---------|----------------|
|`/api/admin/users`|GET	|	View all users with projects & tasks|

 
	
## 🎯 Learning Outcomes
- Clean FastAPI architecture

- Secure JWT authentication

- Role-based access control

- SQLAlchemy relationships

- Real-world REST API design

- React protected routes

- Centralized API handling with Axios

- Scalable frontend folder structure

## 🚀 Future Enhancements
- Refresh tokens

- Notifications

- File attachments

- Activity timeline UI

- Pagination & filters

- Docker deployment

- PostgreSQL support

- Team collaboration features

## 👨‍💻 Author
Vivekanand Kumawat |
Full Stack Developer | FastAPI | React | System Design