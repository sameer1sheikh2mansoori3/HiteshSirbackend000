const asyncHandler = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Generic error response
      }
    };
  };
module.exports = asyncHandler;
  