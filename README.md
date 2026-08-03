# 🛒 Real-Time Marketplace

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)
![Django REST Framework](https://img.shields.io/badge/DRF-A30000?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

A full-stack online marketplace where buyers and sellers can securely buy, sell, and communicate in real time. Built with **Django REST Framework**, **React**, and **Django Channels**.

---

# 🚀 Features

## Authentication

- User Registration
- JWT Login
- JWT Refresh Token
- Logout (Refresh Token Blacklisting)
- User Profile
- Update Profile

---

## Dashboard

- User Dashboard
- My Listed Items
- Marketplace Statistics

---

## Items

- Create Item
- View All Items
- View Item Details
- Update Item
- Delete Item
- Categories API
- Image Upload
- Unsold Item Filtering

---

## Conversations

- Start Conversation
- Conversation List
- Conversation Details
- Delete Conversation

---

## Real-Time Chat

- Django Channels
- WebSocket Communication
- Live Messaging
- Multiple Chat Rooms

---

## Security

- JWT Authentication
- Password Hashing
- Protected API Endpoints
- Owner-only Item Editing
- Owner-only Item Deletion

---

# 🛠 Tech Stack

## Backend

- Python
- Django
- Django REST Framework
- Django Channels
- Simple JWT
- SQLite

## Frontend

- React
- Axios
- React Router
- Tailwind CSS

---

# 📂 Project Structure

```
realtime-marketplace/

backend/
│
├── core/
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── item/
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── dashboard/
│   ├── urls.py
│   └── views.py
│
├── conversation/
│   ├── consumers.py
│   ├── routing.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── backend/
│   ├── settings.py
│   ├── asgi.py
│   └── urls.py
│
└── manage.py
```

---

# 📡 REST API

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/signup/` |
| POST | `/api/auth/login/` |
| POST | `/api/auth/refresh/` |
| POST | `/api/auth/logout/` |
| GET | `/api/auth/profile/` |
| PUT | `/api/auth/profile/` |

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | `/api/dashboard/` |

---

## Items

| Method | Endpoint |
|---------|----------|
| GET | `/api/items/` |
| POST | `/api/items/` |
| GET | `/api/items/<id>/` |
| PUT | `/api/items/<id>/` |
| PATCH | `/api/items/<id>/` |
| DELETE | `/api/items/<id>/` |
| GET | `/api/items/categories/` |

---

## Conversations

| Method | Endpoint |
|---------|----------|
| GET | `/api/conversations/` |
| POST | `/api/conversations/start/` |
| GET | `/api/conversations/<id>/` |
| DELETE | `/api/conversations/<id>/` |

---

## WebSocket

```
ws://127.0.0.1:8000/ws/chat/<conversation_id>/
```

---

# ⚙ Installation

## Clone the repository

```bash
git clone https://github.com/dassomnath99/Online-Marketplace-RTC.git

cd Online-Marketplace-RTC
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist yet:

```bash
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install pillow
pip install channels
pip install python-dotenv
```

---

## Database

```bash
python manage.py makemigrations

python manage.py migrate
```

---

## Create Superuser

```bash
python manage.py createsuperuser
```

---

## Run Server

```bash
python manage.py runserver
```

Backend:

```
http://127.0.0.1:8000/
```

---

# 🧪 API Testing

The API can be tested using

- Postman
- Insomnia
- DRF Browsable API

---

# Future Improvements

- React Frontend
- Image Compression
- Wishlist
- Reviews & Ratings
- Notifications
- Payment Gateway
- Elasticsearch Search
- Redis Channel Layer
- Docker Deployment
- CI/CD Pipeline
- Cloud Deployment (GCP/AWS)

---

# 👨‍💻 Author

**Somnath Das**

- GitHub: https://github.com/buildwithsomnath

---

# 📜 License

This project is licensed under the MIT License.

frontend/
│
├── public/
│
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── auth.js
│   │   ├── items.js
│   │   ├── dashboard.js
│   │   └── conversations.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── ItemCard.jsx
│   │   ├── ChatBox.jsx
│   │   ├── Loading.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MyItems.jsx
│   │   ├── CreateItem.jsx
│   │   ├── EditItem.jsx
│   │   ├── ItemDetails.jsx
│   │   ├── Conversations.jsx
│   │   ├── Chat.jsx
│   │   ├── NotFound.jsx
│   │   └── Search.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │   ├── auth.js
│   │   └── websocket.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── tailwind.config.js