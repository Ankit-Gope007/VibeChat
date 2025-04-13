import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './db/index.js';
import { app } from './app.js';

import http from 'http';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Message } from './models/Message.model.js';


dotenv.config({
    path: './env'
});



connectDB()
    .then(() => {
        try {
            // app.listen(process.env.PORT||8000)
            const server = http.createServer(app);
            const io = new Server(server, {
                cors: {
                  origin:[
      'https://vibe-chat-one.vercel.app',
      'https://vibe-chat-54pz0se69-ankit-gopes-projects-893eb2f8.vercel.app'
    ],, // or your deployed client URL
                  credentials: true,
                },
              });
              io.on('connection', (socket) => {
                console.log(' User connected:', socket.id);
              
                // Join Room
                socket.on('join_room', (roomId) => {
                  socket.join(roomId);
                  console.log(`User ${socket.id} joined room ${roomId}`);
                });
              
                // Send message
                socket.on('send_message', async(data) => {
                    try {
                        await Message.create({
                          room: data.room,
                          sender: data.sender,
                          message: data.message,
                        });
                      } catch (err) {
                        console.error("Error saving message:", err);
                      }
                  
                    console.log("Server received message:", data); 
                    console.log('📤 Sending to room:', data.room)
                  socket.to(data.room).emit('receive_message', data);
                });
              
                socket.on('disconnect', () => {
                  console.log('User disconnected:', socket.id);
                });
              });
            
              server.listen(process.env.PORT || 8000, () => {
                console.log(`Server is listening on port ${process.env.PORT || 8000}`);
              });

        } catch (error) {
            app.on("error", (error) => {
                console.log("ERROR:", error);
                throw error
            })
        }

    })
    .catch((err) => {
        console.log("Mongo DB connection failed", err);

    })

