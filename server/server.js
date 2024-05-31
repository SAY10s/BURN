const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
