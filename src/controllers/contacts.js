
import createHttpError from "http-errors";

import * as contactServices from "../services/contacts.js";

import parsePaginationParams from "../utils/parsePaginationParams.js";
import parseSortParams from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

import { sortFields } from "../db/models/contact.js";

export const getAllContactsController = async (req, res) => {
    const { perPage, page } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams({...req.query, sortFields});
    const filter = parseFilterParams(req.query);

    const {_id: userId} = req.user;

    const data = await contactServices.getContacts({
        perPage,
        page,
        sortBy,
        sortOrder,
        filter: {...filter, userId},
    });
        
    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getAllContactByIdController = async (req, res) => {
  
    const { id } = req.params;
    const { _id: userId } = req.user;
    const data = await contactServices.getAllContactById({ _id: id, userId });
        
    if (!data) {
        throw createHttpError(404, `Contact width id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data,
    });
 
};

export const addContactController = async (req, res) => {
    const { _id: userId } = req.user;
    const data = await contactServices.createContact({...req.body, userId});
    
    
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    });
};

export const upsertContactController = async(req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const {isNew, data} = await contactServices.updateContact({ _id: id, userId }, req.body, { upsert: true });
    
    const status = isNew ? 201 : 200;

   res.status(status).json({
        status,
        message: "Successfully upsert a contact!",
        data,
    });
};

export const patchContactController = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const result = await contactServices.updateContact({ _id: id, userId }, req.body);
    
    if (!result) {
        throw createHttpError(404, `Contact width id=${id} not found`);
    }
    
    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.data,
    });
};

export const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;
    const data = await contactServices.deleteContact({ _id: id, userId });

    if (!data) {
        throw createHttpError(404, `Contact width id=${id} not found`);
    }

    res.status(204).send();
};