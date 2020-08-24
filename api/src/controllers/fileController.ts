import { Request, Response, query } from "express";
import fs from "fs";
import path from "path";
import knex from "./../database/connection";

// Type of the userId parameter when it is passed through the authentication process
interface customReq extends Request {
	userId?: number;
}

interface fileQuery {
	id: number;
	fileUrl: string;
	name: string;
	fileName: string;
	user: Number;
}

async function uploadFile(req: customReq, res: Response) {
	// INSERT FILE INTO THE DATABASE

	// transaction
	const trx = await knex.transaction();

	// @ts-ignore
	for (let file of req.files) {
		const { originalname: name, filename: fileName, size } = file;

		const user = req.userId;

		const data = {
			name,
			fileUrl: `${process.env.MAIN_URL}storage/${fileName}`,
			user,
			fileName,
			size,
		};

		try {
			await trx("files").insert(data);
		} catch (error) {
			// DELETE FILE
			fs.unlinkSync(path.resolve(__dirname, "..", "..", "storage", fileName));

			// rollback transaction
			await trx.rollback();

			// return error
			return res.status(500).json({
				message: "Nao foi possível inserir a imagem no banco de dados.",
				error,
			});
		}
	}

	// commit transaction
	await trx.commit();

	return res.status(200).json({ message: "Upload concluído." });
}

async function getFile(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const result = await knex("files").select("*").where({ id });

		if (result.length === 0) {
			return res.status(404).json({ message: "File not found" });
		}

		const r: fileQuery = result[0];

		const user = await knex("users")
			.select("name")
			.where({ id: r.user })
			.first();

		const data = {
			...r,
			userName: user.name,
		};

		return res.status(200).json(data);
	} catch (err) {
		return res.status(500).json({ message: "Failed to find the file" });
	}
}

async function getAll(req: Request, res: Response) {
	try {
		let result = await knex("files").select("*");

		let parsedResults: any[] = [];

		for (let i = 0; i < result.length; i++) {
			const r: fileQuery = result[i];

			const user = await knex("users")
				.select("name")
				.where({ id: r.user })
				.first();

			let data = {
				...result[i],
				userName: user.name,
			};

			parsedResults.push(data);
		}

		return res.status(200).json(parsedResults);
	} catch (err) {
		return res.status(500).json({ message: "Failed to find the file" });
	}
}

const fileController = {
	uploadFile,
	getFile,
	getAll,
};

export default fileController;
