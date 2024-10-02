import Joi from "joi";
  
import { contactTypeList, phoneNumberRegexp } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).pattern(phoneNumberRegexp).required(),
    email: Joi.string().min(3).max(20).required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20).valid(...contactTypeList).required(),
});

export const contactPatchSchema = Joi.object({
    name: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string(),
});