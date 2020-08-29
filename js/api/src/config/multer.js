"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
exports.default = {
	dest: path_1.default.resolve(__dirname, "..", "..", "storage"),
	storage: multer_1.default.diskStorage({
		destination: (req, file, callback) => {
			callback(
				null,
				path_1.default.resolve(__dirname, "..", "..", "..", "storage")
			);
		},
		filename: (req, file, callback) => {
			crypto_1.default.randomBytes(16, (err, hash) => {
				if (err) throw err;
				const fileName = `${hash.toString("hex")}-${file.originalname}`;
				callback(null, fileName);
			});
		},
	}),
	limits: {
		fileSize: 1024 * 1024 * 1024,
	},
};
