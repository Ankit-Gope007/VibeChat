import { Router } from "express";
import { createFeedback } from "../controllers/Feedback.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT,createFeedback);

export default router;