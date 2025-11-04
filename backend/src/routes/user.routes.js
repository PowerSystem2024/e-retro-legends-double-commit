import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
// import { serverNeonDB } from "../config/neon/neonDbConfig.js";
import { isAuth } from "../middlewares/isAuth.js";
import { pgLocalDB } from "../config/dbConfig.js"; // Importa la configuración de la base de datos local

export const userRouter = Router();
// const userController = new UserController({ userDb: serverNeonDB });
const userController = new UserController({ userDb: pgLocalDB });


userRouter.get("/users", userController.getAllUsers);
userRouter.get("/profile", isAuth, userController.userProfile);
userRouter.get("/:id", isAuth, userController.getUserById);
userRouter.put("/update", isAuth, userController.updateUser);
userRouter.delete("/delete", isAuth, userController.deleteUser)
