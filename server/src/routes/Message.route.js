import { getMessages } from "../controllers/Message.controller.js";
import express from "express";
import { Router } from "express";

const router = Router();


router.get("/:roomID", getMessages);



export default router;