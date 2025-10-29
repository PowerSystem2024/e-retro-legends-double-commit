export const isAuth = (req, res) => {
  try {
    
    res.next();
  } catch (error) {
    res.status(500).json({ message: "Usuario no autenticado", error });
  }
};
