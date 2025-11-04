import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
// import { serverNeonDB } from "../config/neon/neonDbConfig.js"; // Importa la configuración de la base de datos Neon
import { isAuth } from "../middlewares/isAuth.js";
import { pgLocalDB } from "../config/dbConfig.js"; // Importa la configuración de la base de datos local
import { serverNeonDB } from "../config/neon/neonDbConfig.js";

export const authRouter = Router();
const authController = new AuthController({ authDb: pgLocalDB }); // Usa la base de datos local
// const authController = new AuthController({ authDb: serverNeonDB }); // Usa la base de datos Neon

authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.userLogin);
authRouter.get("/logout", isAuth, authController.userLogout);
