import Joi from "joi";
import { ISBN_REGEX } from "../shared/constants/regex.js";

export const listBooksSchema = Joi.object({
  limit: Joi.number().integer().min(5).max(10).default(5).messages({
    "number.base": "'limit' must be a number",
    "number.min": "'limit' must be at least 1",
  }),
  offset: Joi.number().integer().min(0).default(0).messages({
    "number.base": "'offset' must be a number",
    "number.min": "'offset' cannot be negative",
  }),
  sortBy: Joi.string()
    .valid("title", "author", "isbn")
    .default("title")
    .messages({
      "any.only":
        "'sortBy' must be one of the allowed fields 'title', 'author', or 'isbn'",
    }),
  sortOrder: Joi.string().valid("ASC", "DESC").default("ASC").messages({
    "any.only": "'sortOrder' must be either 'ASC' or 'DESC'",
  }),
  searchTerm: Joi.string().allow(null, "").default(null).messages({
    "string.base": "'searchTerm' must be a string",
  }),
});

export const addBookSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages({
    "string.base": `"title" must be a string`,
    "string.empty": `"title" cannot be empty`,
    "string.min": `"title" should have at least {#limit} character(s)`,
    "string.max": `"title" should not exceed {#limit} characters`,
    "any.required": `"title" is required`,
  }),
  author: Joi.string().min(1).max(255).required().messages({
    "string.base": `"author" must be a string`,
    "string.empty": `"author" cannot be empty`,
    "string.min": `"author" should have at least {#limit} character(s)`,
    "string.max": `"author" should not exceed {#limit} characters`,
    "any.required": `"author" is required`,
  }),
  isbn: Joi.string().pattern(ISBN_REGEX).required().messages({
    "string.base": `"isbn" must be a string`,
    "string.empty": `"isbn" cannot be empty`,
    "string.pattern.base": `"isbn" is not valid`,
    "any.required": `"isbn" is required`,
  }),
  totalCount: Joi.number().integer().min(1).required().messages({
    "number.base": `"totalCount" must be a number`,
    "number.integer": `"totalCount" must be an integer`,
    "number.min": `"totalCount" must be at least {#limit}`,
    "any.required": `"totalCount" is required`,
  }),
  shelfLocation: Joi.string().min(1).max(255).required().messages({
    "string.base": `"shelfLocation" must be a string`,
    "string.empty": `"shelfLocation" cannot be empty`,
    "string.min": `"shelfLocation" should have at least {#limit} character(s)`,
    "string.max": `"shelfLocation" should not exceed {#limit} characters`,
    "any.required": `"shelfLocation" is required`,
  }),
});

export const updateBookParamsSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export const updateBookBodySchema = Joi.object({
  title: Joi.string().min(1).max(255).messages({
    "string.base": `"title" must be a string`,
    "string.min": `"title" should have at least {#limit} character(s)`,
    "string.max": `"title" should not exceed {#limit} characters`,
  }),
  author: Joi.string().min(1).max(255).messages({
    "string.base": `"author" must be a string`,
    "string.min": `"author" should have at least {#limit} character(s)`,
    "string.max": `"author" should not exceed {#limit} characters`,
  }),
  isbn: Joi.string().pattern(ISBN_REGEX).messages({
    "string.base": `"isbn" must be a string`,
    "string.pattern.base": `"isbn" is not valid`,
  }),
  totalCount: Joi.number().integer().min(1).messages({
    "number.base": `"totalCount" must be a number`,
    "number.integer": `"totalCount" must be an integer`,
    "number.min": `"totalCount" must be at least {#limit}`,
  }),
  availableCount: Joi.number().integer().min(0).messages({
    "number.base": `"totalCount" must be a number`,
    "number.integer": `"totalCount" must be an integer`,
    "number.min": `"totalCount" must be at least {#limit}`,
  }),
  shelfLocation: Joi.string().min(1).max(255).messages({
    "string.base": `"shelfLocation" must be a string`,
    "string.min": `"shelfLocation" should have at least {#limit} character(s)`,
    "string.max": `"shelfLocation" should not exceed {#limit} characters`,
  }),
});

export const deleteBookSchema = Joi.object({
  id: Joi.number().min(1).required(),
});
