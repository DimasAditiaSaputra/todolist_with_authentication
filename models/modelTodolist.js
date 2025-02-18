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
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
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
  },
  {
    tableName: "todolist",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// **Definisi Relasi One-to-Many**
User.hasMany(Todolist, { foreignKey: "user_id", onDelete: "CASCADE" });
Todolist.belongsTo(User, { foreignKey: "user_id" });

export default Todolist;
