# Addis Eats API — Day 62

## Authorization & Protected Routes

A NestJS backend project demonstrating role-based access control (RBAC), resource ownership, and policy-based authorization for the Addis Eats application.

## Project Overview

The purpose of this project is to control what authenticated users can access and what actions they can perform.

The application uses different user roles and authorization policies to protect resources such as orders and dishes.

## Technologies

- Node.js
- NestJS
- TypeScript
- Jest
- NestJS Guards
- Custom Decorators

## User Roles

The application supports four roles:

| Role         | Description                                           |
| ------------ | ----------------------------------------------------- |
| `customer`   | Can access and manage their own orders                |
| `courier`    | Can access assigned orders and update delivery status |
| `restaurant` | Can manage its own restaurant dishes                  |
| `staff`      | Staff-level access based on authorization policies    |

## Features

### 1. Role-Based Access Control (RBAC)

The application uses roles to control access to protected endpoints.

Implemented components:

- `roles.ts`
- `roles.decorator.ts`
- `roles.guard.ts`

### 2. Custom Decorators

Custom decorators help access authorization metadata and request data.

- `@Roles()` — Defines required user roles.
- `@CheckPolicy()` — Defines the required authorization policy.
- `@CurrentOrder()` — Retrieves the order attached to the request.

### 3. Order Authorization

The application uses order policies to control who can access or modify an order.

Authorization checks include:

- Customer ownership.
- Courier assignment.
- Staff permissions.
- Order status restrictions.

### 4. Dish Authorization

The `DishPolicy` checks whether a restaurant can edit its own dishes.

A restaurant cannot edit dishes belonging to another restaurant.

### 5. Guards

The project includes:

- `RolesGuard`
- `OrderOwnershipGuard`
- `OrderPolicyGuard`

Guards determine whether an incoming request is allowed to continue.

## Project Structure

```text
addis-eats-api/
│
├── src/
│   ├── common/
│   │   ├── auth/
│   │   │   └── roles.ts
│   │   │
│   │   ├── decorators/
│   │   │   ├── check-policy.decorator.ts
│   │   │   ├── current-order.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   │
│   │   ├── guards/
│   │   │   ├── order-ownership.guard.ts
│   │   │   ├── order-policy.guard.ts
│   │   │   └── roles.guard.ts
│   │   │
│   │   ├── interfaces/
│   │   │   ├── auth-user.interface.ts
│   │   │   └── order.interface.ts
│   │   │
│   │   └── policies/
│   │       ├── dish.policy.ts
│   │       ├── dish.policy.spec.ts
│   │       ├── order.policy.ts
│   │       └── order.policy.spec.ts
│   │
│   ├── orders/
│   │   ├── interfaces/
│   │   │   └── order.interface.ts
│   │   ├── orders.controller.ts
│   │   ├── orders.module.ts
│   │   └── orders.service.ts
│   │
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── package.json
└── README.md
```

## Installation

Clone the repository or open the project folder.

Install dependencies:

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run start:dev
```

The application runs at:

```text
http://localhost:3000
```

## Testing

### TypeScript Compilation

```bash
npx tsc --noEmit
```

### Run Unit Tests

```bash
npm test -- --runInBand
```

### Run Tests with Coverage

```bash
npm run test:cov
```

## Authorization Testing

The project includes policy tests for:

### Order Policy

- Customer accessing their own order.
- Customer accessing another customer's order.
- Assigned courier accessing an order.
- Unauthorized users attempting restricted actions.
- Staff authorization according to policy rules.

### Dish Policy

- Restaurant editing its own dish.
- Another restaurant attempting to edit the dish.
- Customer attempting to edit a dish.

## Important Authorization Concepts

| Concept        | Purpose                                     |
| -------------- | ------------------------------------------- |
| Authentication | Identifies who the user is                  |
| Authorization  | Determines what the user can do             |
| RBAC           | Controls access using user roles            |
| Guard          | Protects routes                             |
| Decorator      | Adds metadata to routes                     |
| Policy         | Checks permissions for a specific resource  |
| Ownership      | Checks whether a resource belongs to a user |

## Current Implementation Notes

- Order data is currently represented by the project's service implementation; verify the service before using this project with production data.
- The current `AppModule` registers `RolesGuard` globally.
- JWT authentication must be connected to the application before treating protected endpoints as authenticated in a real deployment.
- The project is an educational authorization exercise, not a production-ready authentication system.

## Learning Outcomes

After completing this exercise, students should understand how to:

1. Implement role-based authorization.
2. Create custom NestJS decorators.
3. Implement authorization guards.
4. Check resource ownership.
5. Build policy-based authorization.
6. Write unit tests for authorization rules.

## Author

**Addis Eats API — CodeOps Module 4**

**Day 62: Authorization & Protected Routes**
