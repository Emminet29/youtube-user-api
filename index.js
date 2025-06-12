const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
require("dotenv").config();

app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
