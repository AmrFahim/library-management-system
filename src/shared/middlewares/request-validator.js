import httpStatus from "http-status";
import { ReqValidationTypes } from "../constants/enums.js";

/**
 * Middleware to validate incoming requests using a specified schema.
 *
 * @param {Object} schema - The Joi schema used to validate the request.
 * @param {string} target - The part of the request to validate (e.g., `body`, `query`, or `params`). Default is `body`.
 * @throws {Object} Returns a 400 BAD_REQUEST response if validation fails,
 * with error details in the response body.
 */
export const validateRequest = (schema, target = ReqValidationTypes.BODY) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[target], { abortEarly: false });

    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: `Validation error on the request's ${target}`,
        details: error.details.map((err) => err.message),
      });
    }
    next();
  };
};
