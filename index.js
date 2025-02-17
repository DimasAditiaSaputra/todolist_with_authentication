import express from "express";
import routerUser from "./routes/routeUser.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routerUser);

app.get("/", (req, res) => {
  return res.send({ msg: "tes" });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
