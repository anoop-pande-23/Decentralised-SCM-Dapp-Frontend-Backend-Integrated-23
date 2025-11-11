// middleware/authorizeRole.js
module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; // comes from auth middleware
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied: insufficient role" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
