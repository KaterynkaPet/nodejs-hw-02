import ContactCollection from "../db/models/contact.js";

export const getAllContacts = () => ContactCollection.find();

export const getAllContactById = id => ContactCollection.findById(id);