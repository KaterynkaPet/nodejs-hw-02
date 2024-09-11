import { Router } from "express";
import * as contactConrollers from "../controllers/contacts.js";

import isValidId from "../middlewares/isValidId.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { contactAddSchema, contactPatchSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get("/",ctrlWrapper(contactConrollers.getAllContactsController));

contactsRouter.get("/:id", isValidId, ctrlWrapper(contactConrollers.getAllContactByIdController));

contactsRouter.post("/", validateBody(contactAddSchema), ctrlWrapper(contactConrollers.addContactController));

contactsRouter.put("/:id", isValidId, validateBody(contactAddSchema), ctrlWrapper(contactConrollers.upsertContactController));

contactsRouter.patch("/:id", isValidId, validateBody(contactPatchSchema), ctrlWrapper(contactConrollers.patchContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(contactConrollers.deleteContactController));

export default contactsRouter;
