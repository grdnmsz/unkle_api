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

const cancelContract = async (req, res) => {
  const { contractId, endDate, email } = req.body;
  // todo control date
  try {
    const update = await prisma.users.update({
      where: { email: email },
      data: {
        contracts: {
          update: {
            where: { id: contractId },
            data: {
              ending_date: endDate + "T00:00:00.000Z",
            },
          },
        },
      },
    });
    return res.json({ message: "contract updated" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getContracts,
  cancelContract,
};

/*
data: {
        contracts: {
          set: { id: contractId },
          connectOrCreate: { ending_date: endDate + "T00:00:00.000Z" },
        },
      },

      */
