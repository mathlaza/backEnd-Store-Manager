const httpStatus = require('../utils/httpStatus');

// Checks if request has field "name"
const checkNameExists = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(httpStatus.BAD_REQUEST)
    .json({ message: '"name" is required' });
  }
  next();
};

// Checks if request field "name" has 5 or more characters
const checkNameLength = (req, res, next) => {
  const { name } = req.body;
  const letters = name.split('');

  if (letters.length < 5) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = {
  checkNameExists,
  checkNameLength,
};
