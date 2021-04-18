const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

routes(app);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
