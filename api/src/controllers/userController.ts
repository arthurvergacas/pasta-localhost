import { Request, Response, NextFunction } from "express";
import knex from "./../database/connection";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// Type of the userId parameter when it is passed through the authentication process
interface customReq extends Request {
	userId?: number;
}

async function checkIfUserExists(name: string) {
	const checkIfExists = await knex("users").select("name").where({ name });
	return checkIfExists.length != 0;
}

async function createUser(req: Request, res: Response) {
	const { name } = req.body;

	if (await checkIfUserExists(name)) {
		// Already exists a user with this name
		return res.status(500).json({ message: "Nome de usuário já existe." });
	}

	const createdUserId = await knex("users").insert({ name });

	return res.status(200).json({ message: "Usuário criado.", createdUserId });
}

async function getUser(req: Request, res: Response) {
	const { id } = req.params;
	try {
		const result = await knex("users").select("*").where({ id });

		if (result.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ user: result[0] });
	} catch (error) {
		return res.status(500).json({ message: "Failed to get user" });
	}
}

async function logIn(req: Request, res: Response) {
	const { name } = req.body;

	if (await checkIfUserExists(name)) {
		const userId = await knex("users").select("id").where({ name });

		const secret = String(process.env.SECRET);
		const token = jwt.sign({ userId }, secret, {
			expiresIn: "1h",
		});

		return res.json({ auth: true, token: token });
	}

	return res.status(500).json({ message: "Usuário não encontrado." });
}

function logOut(req: Request, res: Response) {
	return res.json({ auth: false, token: null });
}

// Type of the token
declare module "http" {
	interface IncomingHttpHeaders {
		"x-access-token"?: string;
	}
}

function verifyToken(req: customReq, res: Response, next: NextFunction) {
	const token = req.headers["x-access-token"];
	if (!token)
		return res
			.status(403)
			.json({ auth: false, message: "Sem token de autenticação disponível" });

	const secret = String(process.env.SECRET);
	jwt.verify(token, secret, (err, decoded) => {
		if (err)
			return res
				.status(403)
				.json({ auth: false, message: "Falha ao autenticar" });

		req.userId = Number((<any>decoded).userId[0].id);
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

export default userController;
