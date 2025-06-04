export const calculatePriceWithVAT = (basePrice, vatPercentage) => {
  if (!basePrice || !vatPercentage) return basePrice;
  const vatAmount = (basePrice * vatPercentage) / 100;
  return Math.ceil(basePrice + vatAmount);
};
