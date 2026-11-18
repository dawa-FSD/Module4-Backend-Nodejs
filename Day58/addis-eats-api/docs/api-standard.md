# Addis Eats API Error Standard

Every error response uses the same five fields:

| Field | Meaning |
|---|---|
| `statusCode` | HTTP status code |
| `message` | Safe, actionable error message (string or array) |
| `path` | Request URL |
| `timestamp` | ISO-8601 time when the error occurred |
| `requestId` | Identifier used to trace the request |

The API never returns stack traces or internal exception details.

## Example

```json
{
  "statusCode": 400,
  "message": ["lines.0.dishId must be a whole number."],
  "path": "/api/v1/orders",
  "timestamp": "2026-11-18T05:00:00.000Z",
  "requestId": "example-request-id"
}
```

## Status codes

- `400`: request validation failed.
- `404`: requested dish or order does not exist.
- `409`: requested state transition or business rule conflicts.
- `500`: unexpected server error; only a generic message is exposed.
