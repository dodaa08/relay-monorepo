import {WebSocketServer} from "ws";
import {prisma} from "@repo/db/client";

const WSS = new WebSocketServer({
    port : 8081
});

console.log("Server running on 8081");

WSS.on("connection", (ws)=>{
    console.log("Connecetd ws sevrer");
    ws.send("Conncetd");

    ws.on("message", async (data)=>{
        if(data.toString() == "sendusers"){
            const users = await prisma.user.findMany({
                select : {id : true, email : true}
            });
            ws.send(JSON.stringify(users));
        }
        else{
            ws.send("Invalid message")
        }
    });

});



