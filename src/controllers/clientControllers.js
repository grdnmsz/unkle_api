const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
 * Gets all the contracts belonging to a client, identified by its unique email
 * @params {httpRequest} req
 * @params {httpResponse} res
 * @returns {httpResponse}
 */
const getContracts = async (req, res) => {
  const {
    client: { email },
  } = req.body;
  try {
    const contracts = await prisma.users
      .findUnique({ where: { email: email } })
      .contracts();
    return res.json(contracts);
  } catch (err) {
    return res.status(500).json({ err: "failed to fet contracts" });
  }
};

/*
 * Cancels a contract's client (email required), by setting up the ending date
 * @params {httpRequest} req
 * @params {httpResponse} res
 * @returns {httpResponse}
 */
const cancelContract = async (req, res) => {
  const {
    contract: { contractId, endDate },
    client: { email },
  } = req.body;
  const now = new Date();

  if (endDate < now)
    return res.status(400).json({ error: "ending date has passed" });

  try {
    await prisma.users.update({
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
    return res.status(500).json({ error: "failed to update contract" });
  }
};
module.exports = {
  getContracts,
  cancelContract,
};
