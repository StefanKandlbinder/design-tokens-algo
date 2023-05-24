export const isCalculation = (value: string) => {
  if (
    value.includes("/") ||
    value.includes("*") ||
    value.includes("+") ||
    value.includes("-")
  ) {
    return true;
  } else {
    return false;
  }
};
