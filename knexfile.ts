// Update with your config settings.
import path from "path";

module.exports = {
	client: "sqlite3",
	connection: {
		filename: path.resolve(
			__dirname,
			"ts_files",
			"src",
			"database",
			"dev.sqlite3"
		),
	},

	migrations: {
		directory: path.resolve(
			__dirname,
			"ts_files",
			"src",
			"database",
			"migrations"
		),
	},

	useNullAsDefault: false,
};
