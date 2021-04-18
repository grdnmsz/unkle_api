const { clientControllers } = require("../controllers/");
const { authMiddlewares } = require("../middlewares");

const clientRoutes = (app) => {
  app.get("/client/contracts", authMiddlewares.authUser, (req, res) => {
    clientControllers.getContracts(req, res);
  });
};

module.exports = clientRoutes;
