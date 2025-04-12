import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {createContactMe} from "../controllers/ContactMe.controller.js";

const router = Router();

router.route("/").post(verifyJWT,createContactMe);

export default router;