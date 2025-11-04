import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { appRouter } from "./routes/index.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.disable("x-powered-by");
app.use("/api", appRouter);

// Solo levantar el servidor si NO estamos en Vercel.. producción 👀 chiquillos!!
if (!process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT ?? 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
