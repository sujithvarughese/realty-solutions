import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import "express-async-errors";
//security package imports
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// router imports
import authRouter from "./routes/auth-router.js"
import unitRouter from "./routes/unit-router.js";
import messagesRouter from "./routes/messages-router.js";
import financeRouter from "./routes/finance-router.js";

// remaining middleware imports
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import { authenticateUser, authorizePermissions } from "./middleware/authentication.js";

//---------------//
const app = express()
dotenv.config();

app.use(cors({
	origin: ["http://localhost:5173", "https://realty-solutions.netlify.app"],
	credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));


if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

// in production
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/", (req, res) => {
	res.send("realty-solutions-home")
})
app.get("/api/v1", (req, res) => {
	res.send("realty-solutions API")
})

app.use("/api/v1/auth", authRouter);  // login, logout, register

app.use("/api/v1/units", authenticateUser, unitRouter)
app.use("/api/v1/messages", authenticateUser, messagesRouter)
app.use("/api/v1/finance", authenticateUser, financeRouter)
app.use(notFound);
app.use(errorHandler);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
})

export default app