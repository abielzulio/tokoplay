export const randomizeCategory = (): string => {
  const category = ["Live", "Eksplor", "Promo"]
  return category[Math.floor(Math.random() * category.length)]
}