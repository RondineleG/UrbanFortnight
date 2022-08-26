export const upperCase = (conformedValue) => {
  return conformedValue.toUpperCase();
};

export const clearPhoneStr = (phone: string): string => {
  return phone
    .replaceAll("+", "")
    .replaceAll(" ", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "")
    .replaceAll("_", "");
};

export const clearCpfStr = (cpf: string): string => {
  return cpf.replaceAll(".", "").replaceAll("-", "").replaceAll("_", "");
};

export const priceStrToFloat = (price: string): number => {
  if (price == null) {
    return null;
  }
  return parseFloat(price.replace(/\./, "").replace(/\,/, "."));
};

export const cmStrToFloat = (cm: string): number => {
  return parseFloat(cm.replace(/cm/, "").replace(/\./, "").replace(/\,/, "."));
};

export const kgStrToFloat = (kg: string): number => {
  return parseFloat(kg.replace(/kg/, "").replace(/\./, "").replace(/\,/, "."));
};

export const validateEmail = (email: string): boolean => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return true;
  }
  return false;
};
