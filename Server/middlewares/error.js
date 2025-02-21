const errorMiddleware = (err, req, res, next) => {
//   console.log(err);
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

// const TryCatch = async (passedFunction) => async (req, res, next) => {
//   try {
//     passedFunction(req, res, next);
//   } catch (error) {
//     next(error);
//   }
// };


export { errorMiddleware, 
  // TryCatch 
};
