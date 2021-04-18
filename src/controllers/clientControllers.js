const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getContracts = async (req, res) => {
  const { email } = req.body;
  try {
    const contracts = await prisma.users
      .findUnique({ where: { email: email } })
      .contracts();
    return res.json(contracts);
  } catch (err) {
    return res.status(500).json({ err: "failed to fet contracts" });
  }
};

module.exports = {
  getContracts,
};
