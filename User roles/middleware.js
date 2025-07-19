// authMiddleware.js
const { ROLES, PERMISSIONS } = require('./roles');

function checkPermission(module, action) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const role = user.role;
    const allowedActions = PERMISSIONS[role]?.[module];

    if (!allowedActions || !allowedActions.includes(action)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
}

module.exports = { checkPermission };
