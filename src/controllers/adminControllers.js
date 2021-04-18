const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { allClientsInDB, allOptionsInDB } = require("../utils");

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

const createContract = async (req, res) => {
  const {
    contract: { startDate, endDate, options, clients },
  } = req.body;

  if (clients === [] || options === [] || !startDate)
    return res
      .status(501)
      .json({ error: "no client or option or starting date for the contract" });

  // checking if all clients and options are already in db
  const allClients = await allClientsInDB(clients);
  const allOptions = await allOptionsInDB(options);
  if (!allClients || !allOptions) {
    return res.status(501).json({
      error: "all clients and options have to be registered in database",
    });
  }

  try {
    const contract = await prisma.contracts.create({
      data: {
        starting_date: startDate + "T00:00:00.000Z",
        ending_date: endDate,
        clients: { connect: clients },
        options: { connect: options },
      },
    });
    return res.json({ contract: contract });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getContracts,
  createContract,
};
