import http from "http"
import express, {Application} from 'express';
import cors from 'cors';
import {Socket} from "socket.io";

import {IMessage} from "./types/IMessage";
import generateUsername from "./helpers/generateUsername";

const PORT: number = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 8080;
const HOST: string = proccess.env.HOST;
const app: Application = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: String(HOST),
    },
});
const messages: Array<IMessage> = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

io.on("connection", (socket: Socket): void => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("newMessage", (message: IMessage): void => {
        messages.push(message);
        io.emit('newMessage', message);
    })

    socket.on("getMessage", () => {
        io.emit('getMessage', messages);
    })

    socket.on("disconnect", (): void => {
        socket.disconnect();
        console.log("🔥: A user disconnected");
    });
});

app.get("/api", (req, res) => {
    res.json(generateUsername());
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
