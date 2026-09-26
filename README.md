# Support Ticket Management System

A full-stack web application for managing customer support tickets between customers and support agents.

## Features

### Customer

- Register and login
- Create support tickets
- View tickets
- View ticket details
- Add comments
- View ticket status updates

### Agent

- Login
- View all customer tickets
- Update ticket status
- Update ticket priority
- Assign tickets to agents
- View users
- View available agents
- Delete tickets
- Add comments

## Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- CSS
- React Router

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database

- MySQL

### API Testing

- Postman

## Project Structure

```text
support-ticket-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   └── services/
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

## Authentication

The application uses JWT-based authentication.

- Users can register and login.
- Passwords are encrypted using bcrypt.
- JWT tokens are used to authenticate API requests.
- Role-based authorization is implemented for customers and agents.

## User Roles

### Customer

Customers can:

- Create tickets
- View their tickets
- Add comments
- View ticket updates

### Agent

Agents can:

- View tickets
- Update tickets
- Assign tickets
- Delete tickets
- View users and agents
- Add comments

## Ticket Flow

```text
Customer
   ↓
Creates Ticket
   ↓
MySQL Database
   ↓
Agent Dashboard
   ↓
Agent Updates Ticket
   ↓
MySQL Database
   ↓
Customer Dashboard
```

## API

### Backend Server

```text
http://localhost:3000
```

### Frontend Server

```text
http://localhost:5173
```

### Main API Endpoints

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/tickets
POST   /api/tickets
GET    /api/tickets/:id
PUT    /api/tickets/:id
DELETE /api/tickets/:id

GET    /api/tickets/:id/comments
POST   /api/tickets/:id/comments

GET    /api/users
GET    /api/users/agents
```

## How to Run

### Backend

Open a terminal:

```bash
cd backend
npm install
npm start
```

### Frontend

Open another terminal:

```bash
cd frontend/frontend
npm install
npm run dev
```

## Database Setup

1. Create a MySQL database.

2. Run the SQL commands from:

```text
backend/database/schema.sql
```

3. Optional sample data can be inserted using:

```text
backend/database/seed.sql
```

4. Configure your database credentials and JWT secret in the backend `.env` file.

## Testing

API endpoints were tested using Postman.

The application was also tested through the React frontend for:

- Customer registration and login
- Customer ticket creation
- Agent ticket viewing
- Agent ticket updates
- Customer viewing updated ticket status
- Ticket comments
- Role-based authorization

## Security

Sensitive files such as `.env` and dependencies such as `node_modules` are excluded from Git using `.gitignore`.

## Author

**Lasya0413**
