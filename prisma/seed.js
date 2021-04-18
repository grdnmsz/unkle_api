const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
 * Populate your database with data that
 * is required for your application to start
 * see more at :
 * https://www.prisma.io/docs/guides/application-lifecycle/seed-database
 */

const usersData = [
  {
    name: "admin",
    email: "admin@mail.com",
    password: "admin",
    role: "ADMIN",
  },
  {
    name: "gordon",
    email: "gordon@mail.com",
    password: "gordon",
  },
];

const optionsData = [
  {
    name: "vol",
    description: "Vous protège contre les vols",
  },
  {
    name: "tout risque",
    description: "Vous êtes tranquille",
  },
  {
    name: "incendie",
    description: "Vous protège contre les incendies (criminels ou naturels)",
  },
  {
    name: "tiers",
    description: "Vous protège au tiers ",
  },
  {
    name: "eaux",
    description: "Vous protège contre tous les dégâts des eaux",
  },
];

const main = async () => {
  console.log("Start seeding …");
  for (const _user of usersData) {
    const user = await prisma.users.create({
      data: _user,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  for (const opt of optionsData) {
    const option = await prisma.options.create({
      data: opt,
    });
    console.log(`Created option with id: ${option.id}`);
  }
  console.log(`Seeding finished.`);
};

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
