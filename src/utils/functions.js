const wrapAsync = asyncFn => (req, res, next, ...params) =>
  Promise.resolve(asyncFn(req, res, next, ...params)).catch(next);

module.exports = { wrapAsync };
