# Addis Eats API

A REST API built with **NestJS** and **TypeScript** for managing restaurant information in the Addis Eats application.

## Project Overview

Addis Eats API is a backend application developed as part of the IBT College Canada Full-Stack Software Development Program.

The project demonstrates backend development concepts using NestJS, including:

- Modules, Controllers, and Services
- Dependency Injection
- Repository Pattern
- Data Transfer Objects (DTOs)
- Input Validation
- Custom Domain Errors
- Exception Handling
- Unit Testing with Jest

## Technologies Used

- Node.js
- NestJS
- TypeScript
- Jest
- Class Validator
- npm

## Project Structure

addis-eats-api/
├── src/
│ ├── restaurants/
│ │ ├── dto/
│ │ │ └── create-restaurant.dto.ts
│ │ ├── restaurant.types.ts
│ │ ├── restaurants.seed.ts
│ │ ├── restaurants.repository.ts
│ │ ├── restaurants.errors.ts
│ │ ├── restaurants.service.ts
│ │ ├── restaurants.controller.ts
│ │ └── restaurants.module.ts
│ ├── app.controller.ts
│ ├── app.module.ts
│ ├── domain-error.filter.ts
│ └── main.ts
├── test/
├── package.json
├── tsconfig.json
├── tsconfig.spec.json
├── jest.config.ts
└── README.md

## Installation

Clone the repository:

git clone YOUR_REPOSITORY_URL

Navigate to the project folder:

cd Day55/addis-eats-api

Install dependencies:

npm install

## Run the Application

Start the development server:

npm run start:dev

The application runs at:

http://localhost:3000

## API Endpoint

### Get All Restaurants

**GET**

http://localhost:3000/api/restaurants

Returns a JSON array containing restaurant information.

## Testing

Run unit tests:

npm test -- --runInBand

Run tests in watch mode:

npm run test:watch

Run tests with coverage:

npm run test:cov

## Build

Build the application:

npm run build

## Learning Objectives

By completing this project, I practiced:

1. Building REST APIs with NestJS.
2. Organizing backend code using modules, controllers, and services.
3. Using dependency injection to connect application components.
4. Applying the repository pattern for data access.
5. Validating incoming data with DTOs.
6. Handling domain errors.
7. Writing unit tests using Jest.

## Author

**Dawa Asfaw Tarefa**

IBT College Canada  
Full-Stack Software Development Program
