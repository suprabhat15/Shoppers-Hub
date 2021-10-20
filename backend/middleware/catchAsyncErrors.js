module.exports = (ErrorsFunc) => (req, res, next) => {
  Promise.resolve(ErrorsFunc(req, res, next)).catch(next);
}