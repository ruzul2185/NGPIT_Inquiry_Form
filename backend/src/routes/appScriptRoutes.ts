import { Router } from "express";
import submitHandler from "../controllers/appScriptController.js";

const router = Router();

router.post("/", submitHandler)

export default router;