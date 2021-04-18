const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
 * @params : clients is an array
 * @returns false if at least one client isn't in DB
 *  or is an admin
 */
const allClientsInDB = async (clients) => {
  for (const { email } of clients) {
    const client = await prisma.users
      .findUnique({ where: { email: email } })
      .catch((err) => console.log(err));

    if (client === null || client.role === "ADMIN") return false;
  }
  return true;
};

/*
 * @params : options is an array
 * @returns false if at least one option isn't in DB
 */
const allOptionsInDB = async (options) => {
  for (const { name } of options) {
    const option = await prisma.options
      .findUnique({ where: { name: name } })
      .catch((err) => console.log(err));

    if (option === null) return false;
  }
  return true;
};

module.exports = {
  allClientsInDB,
  allOptionsInDB,
};
