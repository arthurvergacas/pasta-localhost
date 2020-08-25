"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer.js"));
const fileController_1 = __importDefault(
	require("./controllers/fileController.js")
);
const userController_1 = __importDefault(
	require("./controllers/userController.js")
);
const router = express_1.default.Router();
// USER
// create user
router.post("/sign-in", userController_1.default.createUser);
// login
router.post("/log-in", userController_1.default.logIn);
// logout
router.post("/log-out", userController_1.default.logOut);
// get user by id
router.get(
	"/user/:id",
	userController_1.default.verifyToken,
	userController_1.default.getUser
);
// FILES
// upload file
router.post(
	"/upload",
	userController_1.default.verifyToken,
	multer_1.default(multer_2.default).array("file", 20),
	fileController_1.default.uploadFile
);
// get file
router.get(
	"/file/:id",
	userController_1.default.verifyToken,
	fileController_1.default.getFile
);
// get all files
router.get(
	"/file",
	userController_1.default.verifyToken,
	fileController_1.default.getAll
);
exports.default = router;
