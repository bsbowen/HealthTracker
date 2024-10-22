const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
};

module.exports = errorHandler;
