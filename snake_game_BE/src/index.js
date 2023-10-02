import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import connect from "./database/index.js";
import api from "./routes/api.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("common"));

// Routes
app.use("/api", api);
app.use("*", (_, res) => res.status(404).send({ errorMessage: "Not Found" }));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connect();
});