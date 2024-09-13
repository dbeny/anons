import express, { Request, Response } from "express";
import { Pool } from "pg";
import cors from "cors";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const db = new Pool();

const express_port = 4000;
const ws_port = 8000;

const wss = new WebSocketServer({ port: ws_port });

app.use(express.json());
app.use(cors());

/*
app.get("/messages", async (_: Request, res: Response) => {
	const messages = await MSG.getAllMessages({db});
	res.send(messages);
});
*/

const start = (): void => {
	try {
		app.listen(express_port, () => console.log(`Server listening on port ${express_port}...`));
		
		wss.on("connection", (ws) => {
			ws.on("error", console.error);
			
			ws.on("message", (msg, isBinary) => {
				const msgString = msg.toString("utf-8");
				const msgObject = JSON.parse(msgString) as Message;
				//MSG.insertMessage(msgObject, { db }).catch(e => console.error(e));
				
				wss.clients.forEach((client) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(msgString, { binary: isBinary });
					}
				});
			})
		});
		
		wss.on("close", () => console.warn("WS Connection closed"));
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

void start();