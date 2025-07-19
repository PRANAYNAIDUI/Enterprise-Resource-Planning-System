// src/middleware/auth.js
const { ROLES, PERMISSIONS } = require('../utils/roles');

const roleBasedAccess = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const routePermission = req.route?.stack?.[0]?.route?.methods?.get?.permissions;
    
    if (!routePermission) {
      return next();
    }

    if (!PERMISSIONS[user.role].includes(routePermission)) {
      return res.status(403).json({ message: 'Forbidden access' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = roleBasedAccess;
