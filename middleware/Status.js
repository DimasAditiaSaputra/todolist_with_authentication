export const status = (req, res, next) => {
  if (!req.session || !req.session.token) {
    return res.status(401).json({ msg: "Anda belum login, akses ditolak" });
  }

  next(); // Lanjutkan request jika user sudah login
};
