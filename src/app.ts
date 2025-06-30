import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./app/routes/user.route";
import { universityRoutes } from "./app/routes/university.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Status route
app.get("/status", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Database connected successfully",
  });
});

app.use(userRoutes)
app.use(universityRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "!Ops api not found",
  });
});

export default app;
