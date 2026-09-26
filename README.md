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
│   ├── .env
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
