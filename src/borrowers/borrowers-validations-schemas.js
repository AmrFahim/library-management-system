import Joi from "joi";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  DATE_REGEX,
} from "../shared/constants/regex.js";

export const registerBorrowerSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(NAME_REGEX).required(),
  email: Joi.string().min(8).max(50).pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(8).max(50).pattern(PASSWORD_REGEX).required(),
});

export const loginBorrowerSchema = Joi.object({
  email: Joi.string().min(8).max(50).required(),
  password: Joi.string().min(8).max(50).required(),
});

export const updateBorrowerParamsSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const updateBorrowerBodySchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(NAME_REGEX),
  email: Joi.string().min(8).max(50).pattern(EMAIL_REGEX),
});

export const deleteBorrowerSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const listBorrowersSchema = Joi.object({
  limit: Joi.number().integer().min(5).max(10).default(5),
  offset: Joi.number().integer().min(0).default(0),
  sortBy: Joi.string()
    .valid("registerAt", "email", "name")
    .default("registerAt"),
  sortOrder: Joi.string().valid("ASC", "DESC").default("ASC"),
  searchTerm: Joi.string().allow(null, "").default(null),
});

export const borrowParamsSchema = Joi.object({
  id: Joi.number().min(1).required(),
  bookId: Joi.number().min(1).required(),
});

export const borrowBodySchema = Joi.object({
  returnDate: Joi.string().pattern(DATE_REGEX).required(),
});

export const returnBookParamsSchema = Joi.object({
  id: Joi.number().min(1).required(),
  bookId: Joi.number().min(1).required(),
});

export const listBorrowerActiveProcessesSchema = Joi.object({
  id: Joi.number().min(1).required(),
});
