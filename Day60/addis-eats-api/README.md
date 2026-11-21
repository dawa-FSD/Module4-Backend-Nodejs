# Addis Eats API — Day 60

This is a clean-room teaching implementation based on the Day 60 class-exercise requirements. It includes three resources and twelve documented routes. Since the Day 55–59 source project was not supplied, the route details and in-memory sample data here are an implementation scaffold, not a claim that these are the exact earlier-day routes.

## Setup

```powershell
npm install
Copy-Item .env.example .env
npm run start:dev
```

API base: `http://localhost:3000/api/v1`

Swagger: `http://localhost:3000/docs` (not served in production)

API key header: `x-api-key: addis-eats-secret-key-2026`

## Twelve routes

| Method | Route | Purpose |
|---|---|---|
| GET | /api/v1/restaurants | List restaurants |
| GET | /api/v1/restaurants/:id | Get restaurant |
| POST | /api/v1/restaurants | Create restaurant |
| PATCH | /api/v1/restaurants/:id | Update restaurant |
| GET | /api/v1/dishes | List dishes |
| GET | /api/v1/dishes/:id | Get dish |
| POST | /api/v1/dishes | Create dish |
| PATCH | /api/v1/dishes/:id | Update dish |
| GET | /api/v1/orders | List orders |
| GET | /api/v1/orders/:id | Get order |
| POST | /api/v1/orders | Place order |
| PATCH | /api/v1/orders/:id/status | Update order status |

All data is in memory and resets when the server restarts. Replace the stores with the Day 55–59 store/repository if your instructor expects persistence.

## Export OpenAPI

Stop the dev server, then run:

```powershell
$env:EXPORT_OPENAPI="1"
$env:NODE_ENV="development"
npm run start:dev
```

The application writes `openapi.json` at startup. Stop the process after the file appears, then commit it.

## Test

```powershell
curl.exe -i http://localhost:3000/api/v1/restaurants -H "x-api-key: addis-eats-secret-key-2026"
curl.exe -i http://localhost:3000/api/v1/dishes -H "x-api-key: addis-eats-secret-key-2026"
curl.exe -i -X POST http://localhost:3000/api/v1/orders -H "Content-Type: application/json" -H "x-api-key: addis-eats-secret-key-2026" -d "{\"customer\":\"Abebe Kebede\",\"area\":\"BOLE\",\"phone\":\"0912345678\",\"lines\":[{\"dishId\":1,\"quantity\":2}]}"
```

## Day 60 logging checks

- Set `LOG_LEVEL=info`, `debug`, `warn` or `error` in `.env`.
- Development uses `pino-pretty`; production emits JSON to stdout.
- `genReqId` uses incoming `x-request-id` or generates a UUID.
- Redaction covers authorization, x-api-key and phone fields in request bodies / structured fields.
- Services use `PinoLogger`; request context is supplied by `nestjs-pino` request context. Do not log whole DTOs or request bodies.
