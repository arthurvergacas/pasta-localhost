"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("./../database/connection"));
function uploadFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // INSERT FILE INTO THE DATABASE
        // transaction
        const trx = yield connection_1.default.transaction();
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
                yield trx("files").insert(data);
            }
            catch (error) {
                // DELETE FILE
                fs_1.default.unlinkSync(path_1.default.resolve(__dirname, "..", "..", "storage", fileName));
                // rollback transaction
                yield trx.rollback();
                // return error
                return res.status(500).json({
                    message: "Nao foi possível inserir a imagem no banco de dados.",
                    error,
                });
            }
        }
        // commit transaction
        yield trx.commit();
        return res.status(200).json({ message: "Upload concluído." });
    });
}
function getFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const result = yield connection_1.default("files").select("*").where({ id });
            if (result.length === 0) {
                return res.status(404).json({ message: "File not found" });
            }
            const r = result[0];
            const user = yield connection_1.default("users")
                .select("name")
                .where({ id: r.user })
                .first();
            const data = Object.assign(Object.assign({}, r), { userName: user.name });
            return res.status(200).json(data);
        }
        catch (err) {
            return res.status(500).json({ message: "Failed to find the file" });
        }
    });
}
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield connection_1.default("files").select("*");
            let parsedResults = [];
            for (let i = 0; i < result.length; i++) {
                const r = result[i];
                const user = yield connection_1.default("users")
                    .select("name")
                    .where({ id: r.user })
                    .first();
                let data = Object.assign(Object.assign({}, result[i]), { userName: user.name });
                parsedResults.push(data);
            }
            return res.status(200).json(parsedResults);
        }
        catch (err) {
            return res.status(500).json({ message: "Failed to find the file" });
        }
    });
}
const fileController = {
    uploadFile,
    getFile,
    getAll,
};
exports.default = fileController;
