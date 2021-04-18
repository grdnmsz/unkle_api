const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
 * @params clients {Array<client>} clients (ie. users.role !== ADMIN)
 * @returns {bool} false if at least one client isn't in DB or is an admin, else true
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
 * @params options {Array<option>} options - contracts' options
 * @returns {bool} false if at least one option isn't in DB, else true
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

/*
 * @params  {void}
 * @returns {void} update status in databse according to contracts' dates
 */
const updateContractStatus = async () => {
  const contracts = await prisma.contracts.findMany({
    select: {
      id: true,
      starting_date: true,
      ending_date: true,
    },
  });

  for (const { id, starting_date, ending_date } of contracts) {
    await prisma.contracts.updateMany({
      where: { id: id },
      data: {
        status: _updateStatus(starting_date, ending_date),
      },
    });
  }
};

/*
 * Checks current_time ∈ [s_date, end_date] or not
 * @params {Date} s_date
 * @params {Date} end_date
 * @returns {StatusType: PENDING | ACTIVE | FINISHED}
 */
const _updateStatus = (s_date, end_date) => {
  const now = new Date();
  if (!s_date) return "PENDING"; // default value in DB

  if (now < s_date) return "PENDING";
  else if (s_date <= now) {
    if (!end_date) return "ACTIVE";
    else return now <= end_date ? "ACTIVE" : "FINISHED";
  }
};

module.exports = {
  allClientsInDB,
  allOptionsInDB,
  updateContractStatus,
};
