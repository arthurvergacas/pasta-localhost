import express, { Request, Response } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import fileController from "./controllers/fileController";
import userController from "./controllers/userController";

const router = express.Router();

// USER
// create user
router.post("/sign-in", userController.createUser);
// login
router.post("/log-in", userController.logIn);
// logout
router.post("/log-out", userController.logOut);

// get user by id
router.get("/user/:id", userController.verifyToken, userController.getUser);

// FILES
// upload file
router.post(
	"/upload",
	userController.verifyToken,
	multer(multerConfig).array("file", 20),
	fileController.uploadFile
);

// get file
router.get("/file/:id", userController.verifyToken, fileController.getFile);

// get all files
router.get("/file", userController.verifyToken, fileController.getAll);

export default router;
