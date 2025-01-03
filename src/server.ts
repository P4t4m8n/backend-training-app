import express, { Request, Response } from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
//Option for adding sockets later, remove before deployment if not implemented
const server = http.createServer(app);

//Middleware
app.use(express.json());
//TODO?? build cookie parser and signed cookies, using library for now
app.use(cookieParser(process.env.COOKIE_SECRET));

//CORS
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("public")));
} else {
  const corsOptions: cors.CorsOptions = {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

//Routes

import { authRoutes } from "./api/auth/auth.routes";
app.use("/api/auth", authRoutes);

import { userRoutes } from "./api/users/user.routes";
app.use("/api/users", userRoutes);

import { trainingRoutes } from "./api/training/training.routes";
app.use("/api/training", trainingRoutes);

// Catch-all route
app.get("/**", (req: Request, res: Response) => {
  res.sendFile(path.resolve("public/index.html"));
});
const port = process.env.PORT || 3030;

server.listen(port, () =>
  console.log(`Server ready at: http://localhost:${port}`)
);
