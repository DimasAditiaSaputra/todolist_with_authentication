import { Sequelize, DataTypes } from "sequelize";
import db from "../database/db.js";
import User from "./modelUser.js";

const Todolist = db.define(
  "Todolist",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Perbaikan kesalahan 'users' menjadi 'User'
        key: "id",
      },
      onDelete: "CASCADE", // Jika user dihapus, semua task-nya ikut terhapus
    },
    task: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  {
    tableName: "todolist",
    timestamps: false,
  }
);

// **Definisi Relasi One-to-Many**
User.hasMany(Todolist, { foreignKey: "user_id", onDelete: "CASCADE" });
Todolist.belongsTo(User, { foreignKey: "user_id" });

export default Todolist;
