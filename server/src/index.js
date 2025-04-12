import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './db/index.js';
import { app } from './app.js';
import setupSocket from './socket.js';
import http from 'http';
import { createServer } from 'http';



dotenv.config({
    path: './env'
});

connectDB()
    .then(() => {
        try {
            // app.listen(process.env.PORT||8000)
            const server = http.createServer(app);
            server.listen(process.env.PORT || 8000);
            setupSocket(server);
            console.log(`Server is listening on port ${process.env.PORT}` );

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

