import jwt from "jsonwebtoken";
import path from "path";

export const createAccessToken = (payload) => {
  if (process.env.NODE_ENV !== "production") {
    process.loadEnvFile(path.join(process.cwd(), ".env"));
  }

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
