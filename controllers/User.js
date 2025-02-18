import User from "../models/modelUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const saltRounds = 10;

export const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users[0].password);
  } catch (err) {
    console.log("error");
    return res.status(500).json({ msg: "gagal nge fetch data" });
  }
};

// login
export const login = async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({ msg: "Semua field harus diisi" });
  }

  const emailRegexLogin = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegexLogin.test(gmail)) {
    return res.status(400).json({ msg: "Format email tidak valid" });
  }

  try {
    const user = await User.findOne({ where: { gmail } });
    if (!user) {
      return res.status(200).json({ msg: "gmail atau password salah" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(200).json({ msg: "gmail atau password salah" });

    const token = jwt.sign(
      {
        uuid: user.uuid,
        username: user.username,
        gmail: user.gmail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    req.session.token = token;
    req.session.userId = {
      id: user.id,
    };

    return res.status(200).json({ msg: "berhasil login" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// Register
export const register = async (req, res) => {
  const { username, gmail, password, passwordCheck } = req.body;

  try {
    // Field validation
    if (!username || !gmail || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Semua field harus diisi" });
    }

    // Username validation
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ msg: "Username sudah digunakan" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
      return res.status(400).json({ msg: "Format email tidak valid" });
    }

    // Email existence check
    const existingUserGmail = await User.findOne({ where: { gmail } });
    if (existingUserGmail) {
      return res.status(400).json({ msg: "Email sudah digunakan" });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ msg: "Password minimal 8 karakter" });
    }

    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Password tidak sama" });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const uuid = uuidv4();

    const createAccount = await User.create({
      uuid,
      username,
      gmail,
      password: passwordHash,
    });

    return res.status(201).json({
      msg: "Registrasi berhasil!",
      user: createAccount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

// Logout
export const logout = (req, res) => {
  if (!req.session) {
    return res.status(401).json({ msg: "Tidak ada sesi aktif" });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Error saat logout:", err);
      return res.status(500).json({ msg: "Gagal logout" });
    }

    return res.status(200).json({ msg: "Berhasil logout" });
  });
};
