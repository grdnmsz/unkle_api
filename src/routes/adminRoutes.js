const { adminControllers } = require("../controllers/");
const { authMiddlewares } = require("../middlewares");

const adminRoutes = (app) => {
  app.get("/admin/contracts/", authMiddlewares.adminOnly, (req, res) => {
    adminControllers.getContracts(req, res);
  });
  app.post("/admin/create", authMiddlewares.adminOnly, (req, res) => {
    adminControllers.createContract(req, res);
  });
};

module.exports = adminRoutes;
