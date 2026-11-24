#!/usr/bin/env bash

BASE_URL="http://localhost:3000/api/v1"

CUSTOMER_TOKEN="${CUSTOMER_TOKEN:?Set CUSTOMER_TOKEN}"
COURIER_TOKEN="${COURIER_TOKEN:?Set COURIER_TOKEN}"
RESTAURANT_TOKEN="${RESTAURANT_TOKEN:?Set RESTAURANT_TOKEN}"
STAFF_TOKEN="${STAFF_TOKEN:?Set STAFF_TOKEN}"

test_request() {
  local user="$1"
  local token="$2"
  local method="$3"
  local path="$4"
  local body="${5:-}"

  echo ""
  echo "USER: $user"
  echo "$method $path"

  if [ -n "$body" ]; then
    curl -s -o /dev/null -w "HTTP %{http_code}\n" \
      -X "$method" \
      "$BASE_URL$path" \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json" \
      -d "$body"
  else
    curl -s -o /dev/null -w "HTTP %{http_code}\n" \
      -X "$method" \
      "$BASE_URL$path" \
      -H "Authorization: Bearer $token"
  fi
}

# Rule 1: Read any order (staff).
# Rule 2: Read own order (customer).
# Rule 3: Cancel own pending order.
# Rule 4: Update assigned order.
# Rule 5: Deliver assigned order.
# Rule 6: Edit restaurant's own dish.

for user in \
  "customer:$CUSTOMER_TOKEN" \
  "courier:$COURIER_TOKEN" \
  "restaurant:$RESTAURANT_TOKEN" \
  "staff:$STAFF_TOKEN"
do

  NAME="${user%%:*}"
  TOKEN="${user#*:}"

  echo "================================"
  echo "Testing $NAME"
  echo "================================"

  # 1. Read order.
  test_request "$NAME" "$TOKEN" GET "/orders/1"

  # 2. Read another customer's order.
  test_request "$NAME" "$TOKEN" GET "/orders/2"

  # 3. Cancel pending order.
  test_request "$NAME" "$TOKEN" DELETE "/orders/1"

  # 4. Update assigned order.
  test_request "$NAME" "$TOKEN" PATCH "/orders/4/status" \
    '{"status":"ON_THE_WAY"}'

  # 5. Deliver order.
  test_request "$NAME" "$TOKEN" PATCH "/orders/2/status" \
    '{"status":"DELIVERED"}'

  # 6. Edit restaurant dish.
  test_request "$NAME" "$TOKEN" PATCH "/dishes/1" \
    '{"price":400}'

done