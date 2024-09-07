import { Router } from "express";
import * as contactConrollers from "../controllers/contacts.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get("/",ctrlWrapper(contactConrollers.getAllContactsController));

contactsRouter.get("/:id", ctrlWrapper(contactConrollers.getAllContactByIdController));

contactsRouter.post("/", ctrlWrapper(contactConrollers.addContactController));

contactsRouter.put("/:id", ctrlWrapper(contactConrollers.upsertContactController));

contactsRouter.patch("/:id", ctrlWrapper(contactConrollers.patchContactController));

contactsRouter.delete("/:id", ctrlWrapper(contactConrollers.deleteContactController));

export default contactsRouter;
