import { GET_ALL_USERS, GET_USER_BY_ID, UPDATE_USER, UPDATE_USER_PASSWORD, DELETE_USER, } from "./constants.js";

export class UserController {
  constructor({ userDb }) {
    this.userDb = userDb;
  }

  getFirstRow = (result) => result?.rows?.[0] || result[0] 

  getAllUsers = async (req, res) => {
    try {
      const result = await this.userDb.query(GET_ALL_USERS);
      const users = result?.rows || result;
      return res.status(200).json({ users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener usuarios: " + error.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.userDb.query(GET_USER_BY_ID, [id]);
      const user = this.getFirstRow(result);

      if (!user)
        return res.status(404).json({ message: "Usuario inexistente", id });

      return res.status(200).json({ message: "Usuario encontrado", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el servidor: " + error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.userId;
      const { name, email, avatar } = req.body;

      if (!name || !email)
        return res.status(400).json({ message: "Campos vacíos" });
      const result = await this.userDb.query(GET_USER_BY_ID, [id]);

      const user = this.getFirstRow(result);

      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado" });

      const updated = await this.userDb.query(UPDATE_USER, [
        id,
        name,
        email,
        user.user_password,
        true,
        new Date().toISOString(),
        avatar,
      ]);

      const updatedUser = this.getFirstRow(updated);

      return res
        .status(200)
        .json({ message: "Usuario actualizado", user: updatedUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al actualizar usuario: " + error.message });
    }
  };

  updatePassword = async (req, res) => {
    try {
      const id = req.userId;
      const { password, newPassword } = req.body;
      const result = await this.userDb.query(GET_USER_BY_ID, [id]);
      const user = this.getFirstRow(result);

      const validatedPassword = await compare(password, user.user_password);

      if (!validatedPassword) {
        return res
          .status(400)
          .json({ message: "La contraseña actual es incorrecta." });
      }

      const hashedPassword = await hash(newPassword, 10);
      await this.userDb.query(UPDATE_USER_PASSWORD, [id, hashedPassword, true]);
      res.status(200).json({ message: "Contraseña actualizada" });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar la contraseña: " + error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const id = req.userId;
      const result = await this.userDb.query(DELETE_USER, [id]);
      const deleted = this.getFirstRow(result);

      if (!deleted) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.clearCookie();
      return res
        .status(200)
        .json({ message: "Usuario eliminado", user: deleted });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al borrar usuario: " + error.message });
    }
  };

  userProfile = async (req, res) => {
    try {
      const { userId } = req;
      console.log(req.userId)
      const result = await this.userDb.query(GET_USER_BY_ID, [userId]);
      const user = this.getFirstRow(result);

      if (!user)
        return res.status(404).json({ message: "Usuario inexistente" });

      return res.status(200).json({ message: "Perfil del usuario", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener el perfil: " + error.message });
    }
  };
}
