const path = require("path");
const routeNotFound = (req, res, next) => {
  const error = new Error("Route Not Found");
  return res.status(404).json({ message: error.message });
};

module.exports = { routeNotFound };
