import express from "express";
import routerUser from "./routes/routeUser.js";
import routerTodo from "./routes/routeTodo.js";
import bodyParser from "body-parser";
import SequelizeStore from "connect-session-sequelize";
import session from "express-session";
import db from "./database/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

// membuat table sessions
const SessionStore = SequelizeStore(session.Store);
const store = new SessionStore({
  db: db, // Gunakan instance Sequelize yang benar
  tableName: "sessions", // Nama tabel di database
  checkExpirationInterval: 15 * 60 * 1000, // Cek expired session setiap 15 menit
  expiration: 24 * 60 * 60 * 1000, // Session berlaku 24 jam
});

// store.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Gunakan secret yang kuat
    resave: false, // Jangan simpan ulang sesi jika tidak ada perubahan
    saveUninitialized: false, // Jangan buat sesi sampai ada data tersimpan
    store,
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
