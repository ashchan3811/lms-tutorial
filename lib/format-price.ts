export const formatPrice = (price: number) => {
  if (price > 0) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }

  return "Free";
};
