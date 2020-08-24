import express from "express";
import path from "path";
import router from "./router";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

// The main page provider
app.use(
	"/",
	express.static(path.resolve(__dirname, "..", "..", "client", "dist"))
);

// The files
app.use("/storage", express.static(path.resolve(__dirname, "..", "storage")));

const PORT = process.env.PORT || 80;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
