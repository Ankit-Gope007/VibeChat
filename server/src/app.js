import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials : true,
// }))

const allowedOrigins = [
  'https://vibe-chat-one.vercel.app',
  'https://vibe-chat-54pz0se69-ankit-gopes-projects-893eb2f8.vercel.app'
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from origin: ' + origin));
    }
  },
  credentials: true
}));

app.use(express.json({limit : "1000kb"}))
app.use(express.urlencoded({extended:true,limit : "1000kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// import routes
import profileRoutes from "./routes/Profile.route.js";
import contactRoutes from "./routes/Contacts.route.js";
import requestRoutes from "./routes/Request.route.js";
import contactMeRoutes from "./routes/ContactMe.route.js";
import feedbackRoutes from "./routes/Feedback.route.js";
import messageRoutes from "./routes/Message.route.js";

//route declaration
app.use("/api/chatz/profiles",profileRoutes);
app.use("/api/chatz/contacts",contactRoutes);
app.use("/api/chatz/requests",requestRoutes);
app.use("/api/chatz/contact-me",contactMeRoutes);
app.use("/api/chatz/feedback",feedbackRoutes);
app.use("/api/chatz/messages",messageRoutes);

export {app};
