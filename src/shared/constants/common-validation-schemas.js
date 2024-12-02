import Joi from "joi";

export const listOrSearchQuerySchema = Joi.object({
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
