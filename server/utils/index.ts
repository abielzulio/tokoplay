/**
 * Function to randomize category from "Live", "Eksplor", and "Promo"
 * @returns a random category
 */
export function randomizeCategory(): string {
  const category = ["Live", "Eksplor", "Promo"]
  return category[Math.floor(Math.random() * category.length)]
}
