module.exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).send({ message: 'Student is not logged in' });
    }
    next();
  };