import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
	dest: path.resolve(__dirname, "..", "..", "storage"),
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, path.resolve(__dirname, "..", "..", "storage"));
		},
		filename: (req, file, callback) => {
			crypto.randomBytes(16, (err, hash) => {
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
