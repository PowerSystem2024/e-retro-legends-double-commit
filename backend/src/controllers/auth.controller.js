import { compare, hash } from "bcrypt";
import { CREATE_USER, GET_USER_BY_EMAIL, GET_USER_BY_ID } from "./constants.js";
import { createAccessToken } from "../utils/jwt.js";
import { EmailController } from "./email.controller.js";
import md5 from "md5";

export class AuthController {
  cookieExpiration = 60 * 60 * 24 * 1000;

  constructor({ authDb }) {
    this.authDb = authDb;
  }

  getFirstRow = (result) => result?.rows?.[0] || result[0];

  userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: "Campos vacíos" });

      const userExist = await this.authDb.query(GET_USER_BY_EMAIL, [email]);
      const user = this.getFirstRow(userExist);

      if (!user)
        return res
          .status(404)
          .json({ message: "El correo electrónico no está registrado", email });

      const validated = await compare(password, user.user_password);
      if (!validated)
        return res.status(403).json({ message: "La contraseña es incorrecta" });

      const token = await createAccessToken({ id: user.user_id });

      res.cookie("e_retro_legends_token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: this.cookieExpiration,
      });

      return res.status(200).json({ message: "Ingreso exitoso", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en el login del usuario: " + error.message });
    }
  };

  signUp = async (req, res) => {
    try {
      const { name, lastName, email, password, role, ip, city, state, country } = req.body;
       
      if (!name || !lastName || !email || !password)
        return res.status(400).json({ message: "Campos vacíos" });

      const userExist = await this.authDb.query(GET_USER_BY_EMAIL, [email]);
      const userFound = this.getFirstRow(userExist);

      if (userFound) {
        res
          .status(409)
          .json({ message: `El correo ${email} ya está registrado.` });
        return;
      }

      const hashedPassword = await hash(password, 10);
      const gravatar = `https://gravatar.com/avatar/${md5(email)}`;

      const result = await this.authDb.query(CREATE_USER, [
        name,
        lastName,
        email,
        hashedPassword,
        gravatar,
        role,
        ip,
        city,
        state,
        country,
      ]);

      const newUser = this.getFirstRow(result);
      const token = await createAccessToken({ id: newUser.user_id });

      res.cookie("e_retro_legends_token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: this.cookieExpiration,
      });

      const emailController = new EmailController(name, email);
      await emailController.sendMail();

      return res.status(201).json({
        message: `Se ha enviado un correo a ${email}. No olvides revisar tu bandeja de entrada y, si no lo ves 👀, échale un vistazo a la carpeta de SPAM.`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al crear usuario: " + error.message });
    }
  };

  userLogout = async (req, res) => {
    try {
      const id = req.userId;
      const result = await this.authDb.query(GET_USER_BY_ID, [id]);
      const user = this.getFirstRow(result);

      res.clearCookie("e_retro_legends_token", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      return res
        .status(200)
        .json({ message: "Sesión cerrada correctamente", user: user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error en logout: " + error.message });
    }
  };
}
