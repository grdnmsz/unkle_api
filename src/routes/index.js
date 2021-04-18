const registerRoute = (app) => {
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();
  app.post("/user/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const result = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: password,
          role: role == 2 ? "ADMIN" : "CLIENT",
        },
      });
      return res.json(result);
    } catch (errorMessage) {
      console.log(errorMessage);
      return res.status(500).json({ err: errorMessage });
    }
  });
};

const adminRoutes = require("./adminRoutes");
const clientRoutes = require("./clientRoutes");

const routes = (app) => {
  adminRoutes(app);
  clientRoutes(app);
  registerRoute(app);
};

module.exports = routes;
