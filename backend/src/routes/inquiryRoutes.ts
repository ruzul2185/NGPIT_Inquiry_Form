import { Router } from "express";
import InquiryController from "../controllers/inquiryController";

const router = Router();

router.get("/", InquiryController.getAllInquiries);
router.get("/:id", InquiryController.getSelectedInquiry);
router.post("/", InquiryController.createInquiry);
router.patch("/:id", InquiryController.patchInquiry);
router.delete("/:id", InquiryController.deleteInquiry);

export default router;