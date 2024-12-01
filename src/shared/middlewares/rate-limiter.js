import httpStatus from "http-status";

const rateLimit = (options) => {
  const { windowMs, maxRequests } = options;

  // In-memory storage for rate-limiting data where key is the ip
  const requests = {};

  return (req, res, next) => {
    const key = req.ip;
    const currentTime = Date.now();

    if (!requests[key]) {
      requests[key] = { count: 1, reqTime: currentTime };
    } else {
      const elapsedTime = currentTime - requests[key].reqTime;

      if (elapsedTime < windowMs) {
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
// 10 requests per minute
export const rateLimiter = rateLimit({ windowMs: 60000, maxRequests: 10 });
