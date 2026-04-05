# SyncUp 🎉
A full-stack social platform where users can create, host, and join activities and events.

## Tech Stack
### Backend
- ASP.NET Core Web API
- CQRS + MediatR
- Entity Framework Core
- MSSQL
- FluentValidation
- AutoMapper
- Cloudinary (photo uploads)

### Frontend
- React + TypeScript
- Material UI
- React Query
- React Hook Form

## Features
- Create, host, and join social activities and events
- Cookie-based authentication
- Photo upload and management via Cloudinary
- Centralized error handling via custom middleware
- Efficient server-state management with React Query

## Architecture
Clean Architecture with CQRS and MediatR for a maintainable and scalable backend.

## Prerequisites
- .NET 9 SDK
- Node.js
- SQL Server / MSSQL
- Cloudinary account (for image handling)

## Getting Started
### Backend
1. Clone the repo
2. Update connection string in `appsettings.json`
3. Add your Cloudinary credentials in `appsettings.json`
4. Run migrations: `dotnet ef database update`
5. Run: `dotnet run`

### Frontend
1. Navigate to the client folder
2. Install dependencies: `npm install`
3. Run: `npm start`
