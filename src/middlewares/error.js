module.exports = async (error, _req, res) => {
  const { statusCode, message } = error;
  res.status(statusCode).json({ message });
};
