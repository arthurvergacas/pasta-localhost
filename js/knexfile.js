"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
const path_1 = __importDefault(require("path"));
module.exports = {
    client: "sqlite3",
    connection: {
        filename: path_1.default.resolve(__dirname, "api", "src", "database", "dev.sqlite3"),
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, "api", "src", "database", "migrations"),
    },
    useNullAsDefault: false,
};
