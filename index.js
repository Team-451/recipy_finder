import express from "express";
const app = express();
app.use(express.json());

import connectToDB from "./mongodb/connectToDb.js";

import bodyParser from "body-parser";
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

import cors from "cors";
app.use(cors());

import helmet from "helmet";
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

import * as dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import morgan from "morgan";
app.use(morgan("common"));

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

import path from "path";
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/auth/register", upload.single("picture"), register);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to recipy finder, by team 451" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    connectToDB(process.env.MONGO_URL, () => {
      console.log("MongoDB connected!");
      app.listen(PORT, () =>
        console.log("Server started on port http://localhost:8080")
      );
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
