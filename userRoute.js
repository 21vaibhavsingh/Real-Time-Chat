import express from "express";
import {getotheruser, register} from "../controllers/usercontrol.js";
import {login} from "../controllers/usercontrol.js";
import {logout} from "../controllers/usercontrol.js";
import isauth from "../middleware/isauth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isauth,getotheruser);

export default router;
