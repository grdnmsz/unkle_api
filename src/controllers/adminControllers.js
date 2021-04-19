const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { allClientsInDB, allOptionsInDB } = require("../utils");

/*
 * Gets all the contracts in the database
 * Filtering the data is up to client-side
 * @params {httpRequest} req
 * @params {httpResponse} res
 * @returns {httpResponse}
 */
const getContracts = async (req, res) => {
  try {
    const allContracts = await prisma.contracts.findMany();
    return res.json(allContracts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "failed to fetch contracts" });
  }
};

/*
 * Creates a contract in database
 * @params {httpRequest} req
 * @params {httpResponse} res
 * @returns {httpResponse}
 */
const createContract = async (req, res) => {
  const {
    contract: { startDate, endDate, options, clients },
  } = req.body;
  // todo control date
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
    return res.status(500).json({ error: "failed to create contract" });
  }
};

/*
 * Cancels a contract by setting up the ending date
 * @params {httpRequest} req
 * @params {httpResponse} res
 * @returns {httpResponse}
 */
const cancelContract = async (req, res) => {
  const {
    contract: { contractId, endDate },
  } = req.body;
  const now = new Date();

  if (endDate < now)
    return res.status(400).json({ error: "ending date has passed" });

  try {
    const contract = await prisma.contracts.update({
      where: { id: contractId },
      data: {
        ending_date: endDate + "T00:00:00.000Z",
      },
    });
    return res.json(contract);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to update contract" });
  }
};

/*
 * Creates a new option in the database
 * @params {httpRequest} req
 * @params {httpResponse} res
 * @returns {httpResponse}
 */
const createOption = async (req, res) => {
  const {
    option: { name, description },
  } = req.body;

  if (!name || !description)
    return res
      .status(400)
      .json({ error: "both name and description are required" });

  try {
    const option = await prisma.options.create({
      data: {
        name: name,
        description: description,
      },
    });
    return res.json(option);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "failed to create new option " });
  }
};
module.exports = {
  getContracts,
  createContract,
  cancelContract,
  createOption,
};
