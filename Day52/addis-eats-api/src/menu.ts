export {};

// Exercise 4 - Ethiopian menu using TypeScript.
// Prices are stored in santim: 100 santim = 1 ETB.

type Dish = {
  name: string;
  priceSantim: number;
};

const menu: Dish[] = [
  { name: "Doro Wat", priceSantim: 35_000 },
  { name: "Shiro", priceSantim: 20_000 },
  { name: "Kitfo", priceSantim: 35_000 },
  { name: "Tibs", priceSantim: 28_000 },
  { name: "Chechebsa", priceSantim: 18_000 },
  { name: "Firfir", priceSantim: 15_000 },
  { name: "Dulet", priceSantim: 25_000 },
  { name: "Misir Wat", priceSantim: 12_000 },
];

// Return all dishes cheaper than the given maximum price.
function getDishesUnderPrice(
  dishes: Dish[],
  maximumPriceSantim: number
): Dish[] {
  return dishes.filter((dish) => dish.priceSantim < maximumPriceSantim);
}

// Convert santim to ETB and format it.
function formatETB(amountSantim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
  }).format(amountSantim / 100);
}

// Calculate the total value of all menu items.
function getMenuTotal(dishes: Dish[]): number {
  return dishes.reduce((total, dish) => total + dish.priceSantim, 0);
}

console.log("FULL MENU");
menu.forEach((dish) => {
  console.log(`${dish.name}: ${formatETB(dish.priceSantim)}`);
});

console.log("\nDISHES UNDER 200 ETB");
getDishesUnderPrice(menu, 20_000).forEach((dish) => {
  console.log(`${dish.name}: ${formatETB(dish.priceSantim)}`);
});

console.log(`\nMenu total: ${formatETB(getMenuTotal(menu))}`);
