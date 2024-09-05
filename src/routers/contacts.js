import { Router } from "express";
import { getAllContactsController, getAllContactByIdController } from "../controllers/contacts.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get("/",ctrlWrapper(getAllContactsController));

    contactsRouter.get("/:id", ctrlWrapper(getAllContactByIdController));

export default contactsRouter;
