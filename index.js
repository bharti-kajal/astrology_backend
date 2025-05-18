import express from 'express';
import 'dotenv/config';
import path from 'path';
import {connectMongoDB} from './src/config/dbConfig.js';
import router from './src/config/routes/index.js';
const port = process.env.PORT || 3000;
import cors from 'cors';
import cookieParser from 'cookie-parser';

const server = express();

server.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
};

// Apply CORS middleware before routes
server.use(cors(corsOptions));

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cookieParser());
server.use(router);
// server.set("view engine", "ejs");
// server.set("views", path.join(import.meta.dirname, "templates"));

server.listen(port, () => {
    console.log("server is up and running on port ", port);
    connectMongoDB();
});
