import Todolist from "../models/ModelTodolist.js";

// getAll
export const getAllTodo = async (req, res) => {
  try {
    const userId = req.session.userId.id;
    const todoList = await Todolist.findAll({
      where: { user_id: userId }, // Filter berdasarkan user yang login
      attributes: ["user_id", "task", "status"], // Pilih kolom yang ingin ditampilkan
    });

    return res.status(200).json({ todoList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// Create todo
export const createTodo = async (req, res) => {
  const { task } = req.body;

  // Cek apakah field diisi
  if (!task) {
    return res.status(400).json({ msg: "Semua field harus diisi" });
  }

  try {
    const userId = req.session.userId.id;

    // Simpan task dengan user_id yang sesuai
    const todo = await Todolist.create({
      user_id: userId,
      task,
    });

    return res.status(201).json({
      msg: "Task berhasil dimasukkan",
      todo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};
