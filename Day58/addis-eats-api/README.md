# Day 58 — Make Every Failure Correct

## Install

```powershell
npm install class-validator class-transformer
```

## Run

```powershell
npm run start:dev
```

## Create an order

POST `http://localhost:3000/api/v1/orders`

```json
{
  "customerName": "Dawa Asfaw",
  "paymentMethod": "TELEBIRR",
  "teleBirrNumber": "0912345678",
  "lines": [
    { "dishId": 1, "quantity": 2 },
    { "dishId": 3, "quantity": 1 }
  ]
}
```

The server calculates `totalSantim`; clients must not send prices or totals.

## Change order status

PATCH `http://localhost:3000/api/v1/orders/1/status`

```json
{ "status": "CONFIRMED" }
```

Allowed transitions are defined in `OrdersService.allowedTransitions`.

## Notes

The starter directory and its `expected.md`, twelve bad-request JSON files, and `run-all.sh`
were not present in the project snapshot. The application code here implements the assignment
rules, but exact twelve-case acceptance matching must be checked against the official starter files.
