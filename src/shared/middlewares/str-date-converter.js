import httpStatus from "http-status";

export const stringToDate = (...fields) => {
  return (req, res, next) => {
    try {
      fields.forEach((field) => {
        if (req.body[field]) {
          const date = new Date(req.body[field]);

          if (isNaN(date.getTime())) {
            return res.status(httpStatus.BAD_REQUEST).json({
              error: `"${field}" must be a valid date in the format YYYY-MM-DD`,
            });
          }

          const today = new Date();
          today.setHours(0, 0, 0, 0); // Set time to start of the day
          if (date <= today) {
            return res.status(httpStatus.BAD_REQUEST).json({
              error: `"${field}" must be a date in the future`,
            });
          }

          req.body[field] = date;
        }
      });
      next();
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong in the middleware" });
    }
  };
};
