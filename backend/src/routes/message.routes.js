import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllContacts, sendMessage , getMessagesByUserId , getChatPartners } from "../controllers/messages.controllers.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection,protectRoute);

router.get("/contacts", getAllContacts);
router.post("/:id",sendMessage);
router.get("/chats", getChatPartners);
router.get("/:id",getMessagesByUserId);



export default router;