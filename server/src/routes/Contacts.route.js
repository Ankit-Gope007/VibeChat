import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { searchContacts } from "../controllers/Contacts.controller.js";


 const router =Router();

router.route("/search").post(verifyJWT,searchContacts);

 export default router;