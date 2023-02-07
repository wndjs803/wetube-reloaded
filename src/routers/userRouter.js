import express from "express";
import { edit, del } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", del);

export default userRouter;
