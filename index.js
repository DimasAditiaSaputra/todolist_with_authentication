import express from "express";
import routerUser from "./routes/routeUser.js";
import routerTodo from "./routes/routeTodo.js";
import bodyParser from "body-parser";
import session from "express-session";
import db from "./database/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Gunakan secret yang kuat
    resave: false, // Jangan simpan ulang sesi jika tidak ada perubahan
    saveUninitialized: false, // Jangan buat sesi sampai ada data tersimpan
    cookie: {
      httpOnly: true, // Melindungi dari XSS
      secure: "auto", // Aktifkan hanya di HTTPS
      sameSite: "strict", // Mencegah CSRF
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
    },
  })
);
app.use("/", routerUser);
app.use("/", routerTodo);

app.get("/", (req, res) => {
  return res.send({ msg: "tes" });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
