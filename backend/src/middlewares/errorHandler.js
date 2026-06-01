const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      message: 'Phone number already exists',
    });
  }

  if (err.code === '23502') {
    return res.status(400).json({
      success: false,
      message: `Missing required field: ${err.column}`,
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

export default errorHandler;