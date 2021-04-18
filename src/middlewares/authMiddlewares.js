/*
 * this is a basic authentification and authorization 
 * system, with user and role verification, splitted in two handlers
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
 * authentificate a user (client or admin)
 */
const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({ where: { email: email } });
  if (user === []) {
    // user exist ?
    return res.status(401).json("user doesn't exist or wrong password");
  } else if (user?.password !== password) {
    // if password is wrong
    return res.status(401).json("user doesn't exist or wrong password");
  }
  next(); // no problem, we keep going
};

/*
 * grant access for admins only
 */
const adminOnly = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({ where: { email: email } });
  if (user?.password !== password || user?.role !== "ADMIN")
    return res.status(403).json("forbidden");

  next(); // granted
};

module.exports = { authUser, adminOnly };
