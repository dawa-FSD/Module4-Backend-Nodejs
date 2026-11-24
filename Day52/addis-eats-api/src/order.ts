export {};

// Module 4 - Day 52
// Addis Eats Order mini-project
// All prices are stored in santim: 100 santim = 1 ETB.

const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;
type Area = (typeof AREAS)[number];

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "Ready"
  | "Delivered";

type Dish = {
  name: string;
  priceSantim: number;
};

type Order = {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  totalSantim: number;
};

// One formatter for every ETB amount displayed in the receipt.
function formatETB(amountSantim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
  }).format(amountSantim / 100);
}

// Free delivery when the order total is above 500 ETB.
// Otherwise, Bole costs 40 ETB and other areas cost 60 ETB.
function deliveryFee(order: Order): number {
  if (order.totalSantim > 50_000) {
    return 0;
  }

  if (order.area === "Bole") {
    return 4_000;
  }

  return 6_000;
}

function statusMessage(status: OrderStatus): string {
  switch (status) {
    case "Pending":
      return "Your order is waiting for confirmation.";
    case "Confirmed":
      return "Your order has been confirmed.";
    case "Preparing":
      return "The kitchen is preparing your order.";
    case "Ready":
      return "Your order is ready for delivery.";
    case "Delivered":
      return "Your order has been delivered. Thank you!";
    default: {
      const unreachable: never = status;
      return unreachable;
    }
  }
}

function receipt(order: Order): string {
  const dishesText = order.dishes
    .map((dish) => `- ${dish.name}: ${formatETB(dish.priceSantim)}`)
    .join("\n");

  const fee = deliveryFee(order);
  const grandTotal = order.totalSantim + fee;

  return `
========== ADDIS EATS ==========
Order ID: ${order.id}
Customer: ${order.customer}
Delivery area: ${order.area}
Phone: ${order.phone ?? "Not provided"}

DISHES
${dishesText}

Food total: ${formatETB(order.totalSantim)}
Delivery fee: ${formatETB(fee)}
Grand total: ${formatETB(grandTotal)}

Status: ${statusMessage(order.status)}
================================
`.trim();
}

// Sample order for testing.
const myOrder: Order = {
  id: 1001,
  customer: "Dawa Asfaw",
  area: "Bole",
  status: "Preparing",
  dishes: [
    { name: "Doro Wat", priceSantim: 35_000 },
    { name: "Shiro", priceSantim: 20_000 },
  ],
  phone: "0912345678",
  totalSantim: 55_000,
};

console.log(receipt(myOrder));
