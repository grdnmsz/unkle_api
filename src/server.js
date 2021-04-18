const express = require("express");
const cron = require("node-cron");
const routes = require("./routes");
const { updateContractStatus } = require("./utils");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

routes(app);

cron.schedule(
  "59 23 * * *",
  () => {
    updateContractStatus();
    console.log("Daily update of contracts' status");
  },
  { timezone: "Europe/Paris" }
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
