import { Server as SocketIOServer } from 'socket.io';

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,

        },
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log("User disconnected with ID:", socket.id);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }


    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log("User connected with ID:", userId, "Socket ID:", socket.id);
        }
        else {
            console.log("User connected without ID");
        }
    })

    io.on("disconnect", () => disconnect(socket));
    // socket.on("disconnect", () => {
    //     disconnect(socket);
    // });
}

export default setupSocket;