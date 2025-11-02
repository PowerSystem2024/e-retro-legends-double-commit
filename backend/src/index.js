import express from "express";
import cors from "cors";

export const createApp = ({ routes }) => {
  const app = express();

  app.use(express.json({ limit: "5mb" }));
  app.use(cors());
  app.use(routes)

  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};
