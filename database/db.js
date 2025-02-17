import { Sequelize } from "sequelize";

const db = new Sequelize("todolist_db", "root", "dimasroot123", {
  host: "localhost",
  dialect: "mysql",
});

async function connectDB() {
  try {
    await db.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default db;
