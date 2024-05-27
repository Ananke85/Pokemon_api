const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server is up and running ⚡ at ${port}`);
});