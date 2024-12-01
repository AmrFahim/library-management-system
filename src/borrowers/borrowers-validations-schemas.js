import Joi from "joi";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../shared/constants/regex.js";

export const registerBorrowerSchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(NAME_REGEX).required(),
  email: Joi.string().min(8).max(50).pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(8).max(50).pattern(PASSWORD_REGEX).required(),
});

export const updateBorrowerParamsSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const updateBorrowerBodySchema = Joi.object({
  name: Joi.string().min(3).max(30).pattern(NAME_REGEX),
  email: Joi.string().min(8).max(50).pattern(EMAIL_REGEX),
  password: Joi.string().min(8).max(50).pattern(PASSWORD_REGEX),
});

export const deleteBorrowerSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const listBorrowersSchema = Joi.object({
  limit: Joi.number().integer().min(5).max(10).default(5),
  offset: Joi.number().integer().min(0).default(0),
  sortBy: Joi.string().valid("title", "author", "isbn").default("title"),
  sortOrder: Joi.string().valid("ASC", "DESC").default("ASC"),
  searchTerm: Joi.string().allow(null, "").default(null),
});
