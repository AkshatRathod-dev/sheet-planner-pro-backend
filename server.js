import express from "express";
import cors from "cors";
import calculateRoutes from "./src/routes/calculate.routes.js";
import exportRoutes from "./src/routes/export.routes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/calculate", calculateRoutes);
app.use("/api/export", exportRoutes);

app.get("/", (_, res) => res.send("Sheet Planner Pro API Running"));

app.listen(5000, () => console.log("Server started"));

app.get("/", (req, res) => {
  res.send("Sheet Planner Pro API running");
});

