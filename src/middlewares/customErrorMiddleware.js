exports.customErrorHandler = (err, req, res, next) => {
   res.status(500).json({ message: 'An error was encountered', err });
}