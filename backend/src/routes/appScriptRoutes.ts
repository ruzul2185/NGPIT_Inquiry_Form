import { Router } from "express";
import submitHandler from "../controllers/appScriptController";

const router = Router();

router.post("/", submitHandler)//Since typescript say that router handler must return void or Promise<void>,
//  we can safely ignore the return type here.

export default router;