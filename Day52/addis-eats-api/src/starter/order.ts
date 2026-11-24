const AREAS = [
  "Bole",
  "Piassa",
  "Kazanchis",
  "Saris",
] as const;

export type Area = (typeof AREAS)[number];

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "OutForDelivery"
  | "Delivered";

export interface Dish {
  name: string;
  price: number;
}

export interface Order {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  telebirrPhone?: string;
  total: number;
}

export function deliveryFee(order: Order): number {
  if (order.total > 50000) {
    return 0;
  }

  if (order.area === "Bole") {
    return 4000;
  }

  return 6000;
}

export function statusMessage(status: OrderStatus): string {
  switch (status) {
    case "Pending":
      return "Your order is waiting for confirmation.";

    case "Confirmed":
      return "Your order has been confirmed.";

    case "Preparing":
      return "Your food is being prepared.";

    case "OutForDelivery":
      return "Your order is on the way.";

    case "Delivered":
      return "Your order has been delivered.";

    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

function formatETB(amountInSantim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(amountInSantim / 100);
}

export function receipt(order: Order): string {
  const fee = deliveryFee(order);

  return `
================================
        ADDIS EATS RECEIPT
================================
Order ID:       ${order.id}
Customer:       ${order.customerName}
Delivery Area:  ${order.area}
Status:         ${statusMessage(order.status)}
--------------------------------
DISHES
${order.dishes
  .map(
    (dish) =>
      `${dish.name.padEnd(20)} ${formatETB(dish.price)}`
  )
  .join("\n")}
--------------------------------
Subtotal:       ${formatETB(order.total)}
Delivery Fee:   ${formatETB(fee)}
--------------------------------
Total:          ${formatETB(order.total + fee)}
${order.telebirrPhone ? `TeleBirr:       ${order.telebirrPhone}` : ""}
================================
       THANK YOU!
================================
`;
}