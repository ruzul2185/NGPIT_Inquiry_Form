import { Router } from "express";
import InquiryController from "../controllers/inquiryController";

import { verifySupabaseToken } from "../middlewares/verifySupabaseToken";

const router = Router();

router.get("/", verifySupabaseToken, InquiryController.getAllInquiries);
router.get("/:id", verifySupabaseToken, InquiryController.getSelectedInquiry);
router.post("/", verifySupabaseToken, InquiryController.createInquiry);
router.patch("/:id", verifySupabaseToken, InquiryController.patchInquiry);
router.delete("/:id", verifySupabaseToken, InquiryController.deleteInquiry);

export default router;