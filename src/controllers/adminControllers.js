const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
 * Get all the contracts in the database
 * Filtering the data is up to client-side
 */
const getContracts = async (req, res) => {
  try {
    const allContracts = await prisma.contracts.findMany();
    return res.json(allContracts);
  } catch (err) {
    return res.status(500).json({ err: "failed to fet contracts" });
  }
};

module.exports = {
  getContracts,
};
