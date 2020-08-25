"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./router.js"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(router_1.default);
// The main page provider
app.use(
	"/",
	express_1.default.static(
		path_1.default.resolve(__dirname, "..", "..", "client", "dist")
	)
);
// The files
app.use(
	"/storage",
	express_1.default.static(path_1.default.resolve(__dirname, "..", "storage"))
);
const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
