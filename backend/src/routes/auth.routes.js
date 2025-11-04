import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { serverNeonDB } from "../config/neon/neonDbConfig.js";
import { isAuth } from "../middlewares/isAuth.js";

export const authRouter = Router();
const authController = new AuthController({ authDb: serverNeonDB });

authRouter.post("/signup", authController.signUp);
authRouter.post("/login", authController.userLogin);
authRouter.get("/logout", isAuth, authController.userLogout);
