import { Router } from "express";
import { sendRequest, getRequests, updateRequest,validRequest,contacts } from "../controllers/Request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/send-request").post(verifyJWT,sendRequest);
router.route("/get-requests").get(verifyJWT,getRequests);
router.route("/update-request").post(verifyJWT,updateRequest);
router.route("/valid-request").post(verifyJWT,validRequest);
router.route("/contacts").get(verifyJWT,contacts);


export default router;