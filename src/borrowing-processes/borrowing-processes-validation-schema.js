import Joi from "joi";

export const listLastMonthProcessesSchema = Joi.object({
  onlyOverdue: Joi.boolean().default(false),
});
