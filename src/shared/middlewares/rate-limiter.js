import httpStatus from "http-status";
import { configs } from "../utils/config.js";
const rateLimit = (options) => {
  const { timeWindowLimit, maxRequests } = options;

  // In-memory storage for rate-limiting data where key is the ip
  const requests = {};

  return (req, res, next) => {
    const key = req.ip;
    const currentTime = Date.now();

    if (!requests[key]) {
      requests[key] = { count: 1, reqTime: currentTime };
    } else {
      const elapsedTime = currentTime - requests[key].reqTime;

      if (elapsedTime < timeWindowLimit) {
        requests[key].count++;
      } else {
        requests[key] = { count: 1, reqTime: currentTime };
      }
    }

    // Check if the client exceeded the limit
    if (requests[key].count > maxRequests) {
      return res.status(httpStatus.TOO_MANY_REQUESTS).json({
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  };
};
export const rateLimiter = rateLimit({
  timeWindowLimit: configs.RATE_LIMITING_WINDOW,
  maxRequests: configs.RATE_LIMITING_REQUESTS_COUNT,
});
