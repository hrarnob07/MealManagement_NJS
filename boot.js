global.__basedir = __dirname;

import express from "express";
const app = express();

app.use(express.static(__dirname + "/Public"));

require("./System/bootstrap")(app);

export default app;