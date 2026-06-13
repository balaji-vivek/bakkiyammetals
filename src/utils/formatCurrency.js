export const formatCurrency = (amountInPaise) => {
  // Accept amounts stored in paise (integer). Convert to rupees for display.
  const rupees = Number(amountInPaise || 0) / 100;
  return rupees.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
};

export default formatCurrency;