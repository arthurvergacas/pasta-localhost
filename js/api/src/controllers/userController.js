"use strict";
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v });
		  }
		: function (o, v) {
				o["default"] = v;
		  });
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== "default" && Object.hasOwnProperty.call(mod, k))
					__createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./../database/connection"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function checkIfUserExists(name) {
	return __awaiter(this, void 0, void 0, function* () {
		const checkIfExists = yield connection_1
			.default("users")
			.select("name")
			.where({ name });
		return checkIfExists.length != 0;
	});
}
function createUser(req, res) {
	return __awaiter(this, void 0, void 0, function* () {
		const { name } = req.body;
		if (yield checkIfUserExists(name)) {
			// Already exists a user with this name
			return res.status(500).json({ message: "Nome de usuário já existe." });
		}
		const createdUserId = yield connection_1.default("users").insert({ name });
		return res.status(200).json({ message: "Usuário criado.", createdUserId });
	});
}
function getUser(req, res) {
	return __awaiter(this, void 0, void 0, function* () {
		const { id } = req.params;
		try {
			const result = yield connection_1
				.default("users")
				.select("*")
				.where({ id });
			if (result.length === 0) {
				return res.status(404).json({ message: "User not found" });
			}
			return res.status(200).json({ user: result[0] });
		} catch (error) {
			return res.status(500).json({ message: "Failed to get user" });
		}
	});
}
function logIn(req, res) {
	return __awaiter(this, void 0, void 0, function* () {
		const { name } = req.body;
		if (yield checkIfUserExists(name)) {
			const userId = yield connection_1
				.default("users")
				.select("id")
				.where({ name });
			const secret = String(process.env.SECRET);
			const token = jsonwebtoken_1.default.sign({ userId }, secret, {
				expiresIn: "1h",
			});
			return res.json({ auth: true, token: token });
		}
		return res.status(500).json({ message: "Usuário não encontrado." });
	});
}
function logOut(req, res) {
	return res.json({ auth: false, token: null });
}
function verifyToken(req, res, next) {
	const token = req.headers["x-access-token"];
	if (!token)
		return res
			.status(403)
			.json({ auth: false, message: "Sem token de autenticação disponível" });
	const secret = String(process.env.SECRET);
	jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
		if (err)
			return res
				.status(403)
				.json({ auth: false, message: "Falha ao autenticar" });
		req.userId = Number(decoded.userId[0].id);
		next();
	});
}
const userController = {
	createUser,
	getUser,
	logIn,
	logOut,
	verifyToken,
};
exports.default = userController;
