import express from "express";
import cors from "cors";
import { appRouter } from "./routes/index.js";

export const createApp = () => {
  const app = express();

  app.use(express.json({ limit: "10mb" }));
  app.use(cors());
  app.use("/api", appRouter)

  const PORT = process.env.PORT ?? 3000;
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
