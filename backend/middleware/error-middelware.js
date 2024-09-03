const errorMiddelware = (err, req, res, next) => {
  console.error("Error :", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddelware;
