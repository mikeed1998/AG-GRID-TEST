# 📊 Excel Template Tester

App for testing Excel templates.

## 🧠 Tech Stack

### 🖥️ Frontend
- **ReactJS**

### ⚙️ Backend
- **Fastify** – Lightweight and fast backend framework
- **Prisma** – Type-safe ORM for PostgreSQL, MySQL, and more
- **TypeScript**

## 📁 Project Structure

```bash
.
.
├── backend/        # Fastify + Prisma backend
│   ├── prisma/     # Database schema and migrations
│   │   └── migrations/
│   └── src/        # Backend source code
│       ├── container/  # Dependency injection setup
│       ├── interfaces/ # TypeScript interfaces
│       ├── routes/     # API route definitions
│       └── services/   # Business logic services
│
├── frontend/       # ReactJS frontend
│   ├── public/     # Static assets
│   └── src/        # Frontend source code
│       ├── api/    # API client configuration
│       ├── assets/ # Images, fonts, etc.
│       ├── components/ # React components
│       └── hooks/  # Custom React hooks
│
└── README.md       # Project documentation
