# Library Management System

## Overview
A  NodeJS-based library management system

## Features
- Book Management
  - Add, update, delete books
  - Search books by title, author, or ISBN
  - Track book availability and location

- Borrower Management
  - Register, authenticate, update, delete borrowers
  - Track borrowing active borrows
  - Monitor book due dates

- Borrowing Processes 
  - a borrower can borrow and return books
  - Track overdue books
  - List processes from last month

## Search Performance
The system implements advanced search using:
- PostgreSQL `pg_trgm` extension
- Indexed searches
- Optimized query performance

### Search Endpoint
Use a single endpoint for listing and searching books:
```
GET /books?searchTerm=<query>
```
- With no `searchTerm`: Returns all books
- With `searchTerm`: Performs fuzzy search across title, author, ISBN

## Bonus Features Implemented
- Rate Limiting: Applied to two endpoints
- Basic Authentication: Implemented for Borrower Module
- Docker Support: Containerized application with docker-compose
- Borrowing Process Exports
    - Without `onlyOverdue`: All borrowing processes for last month
    - With `onlyOverdue=true`: Only overdue books from last month

## Technical Stack
- Backend: NodeJS
- Database: PostgreSQL
- API: RESTful design

## Performance Optimizations
- Indexed database searches
- Efficient read operations
- Scalable architecture

## Setup Instructions

Create `.env` file (use `example.env` as template)

### Using Docker
1. Build and start with Docker:
   ```
   docker-compose up --build
   ```
2. DB_URL while using docker is `postgresql://postgres:secret@postgres:5432/library_db` 

### 
## API Documentation: 
   - Swagger Docs: `http://localhost:3000/api-docs/#/`

## Database Schema
![Database Diagram](db-digram.png)
