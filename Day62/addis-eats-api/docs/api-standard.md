# Addis Eats API Standard

## Authentication

401 Unauthorized:
The request has no valid access token.

## Authorization

403 Forbidden:
The user is authenticated but cannot perform
the requested action.

404 Not Found:
The requested resource does not exist,
or its existence is intentionally hidden.

## Business Rules

409 Conflict:
The requested operation conflicts with
the current resource state.

## Authorization examples

| Request                            | Expected |
| ---------------------------------- | -------- |
| Customer reads own order           | 200      |
| Customer reads another order       | 404      |
| Staff reads any order              | 200      |
| Customer cancels pending own order | 200      |
| Customer cancels another order     | 403      |
| Customer cancels ON_THE_WAY order  | 403      |
| Unauthenticated request            | 401      |

## Collection security

GET /api/v1/orders must return only
the orders visible to the authenticated user.

## Logging

Record denied authorization attempts
internally without exposing private resource
information to the caller.
