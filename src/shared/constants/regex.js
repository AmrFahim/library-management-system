export const ISBN_REGEX = /^(97[89])-\d{3}-\d{5}-\d{3}-\d{1}$/;
export const NAME_REGEX = /^[a-zA-Z\s'-]{3,30}$/;
export const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{5,}$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/;
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
