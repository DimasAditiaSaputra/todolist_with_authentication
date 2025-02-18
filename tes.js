import bcrypt from "bcrypt";
const saltRounds = 10;

const passwordHash = await bcrypt.hash("dimasaditia123", saltRounds);
console.log(passwordHash);

// $2b$10$PJps8mImy4OHUgVqbH9kdOU82CNc41tbStHIO1KhiVfxs/2DPx4Ui
