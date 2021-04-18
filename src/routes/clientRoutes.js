const { clientControllers } = require("../controllers/");
const { authMiddlewares } = require("../middlewares");

const clientRoutes = (app) => {
  app.get("/client/contracts", authMiddlewares.authUser, (req, res) => {
    clientControllers.getContracts(req, res);
  });
  
  app.put("/client/contract", authMiddlewares.authUser, (req, res) => {
    // update client's ending date
    clientControllers.cancelContract(req, res);
  });
};

module.exports = clientRoutes;
