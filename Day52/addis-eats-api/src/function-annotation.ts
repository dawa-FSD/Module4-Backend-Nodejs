export {};

// Exercise 5 - Annotate an untyped function.
// This is a practice example. For the assignment, also annotate a function
// from one of your own Module 2 files.

type MenuItem = {
  name: string;
  price: number;
};

function findAffordableItems(
  items: MenuItem[],
  maximumPrice: number
): MenuItem[] {
  return items.filter((item) => item.price < maximumPrice);
}

const sampleItems: MenuItem[] = [
  { name: "Shiro", price: 200 },
  { name: "Doro Wat", price: 350 },
  { name: "Chechebsa", price: 180 },
];

const affordableItems: MenuItem[] = findAffordableItems(sampleItems, 250);

console.log(affordableItems);
