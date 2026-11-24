# Addis Eats Authorization Rules

| No  | User       | Action  | Rule                      |
| --- | ---------- | ------- | ------------------------- |
| 1   | Staff      | Read    | Any order                 |
| 2   | Customer   | Read    | Own order                 |
| 3   | Customer   | Cancel  | Own PENDING order         |
| 4   | Courier    | Update  | Assigned order            |
| 5   | Courier    | Deliver | Assigned ON_THE_WAY order |
| 6   | Restaurant | Edit    | Own restaurant dishes     |

## Security

- 401: Unauthenticated
- 403: Authenticated but forbidden
- 404: Hidden or nonexistent resource
- 409: Invalid resource state
- Deny by default
