import * as contactServices from "../services/contacts.js";
import createHttpError from "http-errors";

export const getAllContactsController = async (req, res) => {

    const data = await contactServices.getAllContacts();
        
    res.json({
        tatus: 200,
        message: "Successfully found contacts!",
        data,
    });
   
};

export const getAllContactByIdController = async (req, res) => {
  
    const { id } = req.params;
    const data = await contactServices.getAllContactById(id);
        
    if (!data) {
        throw createHttpError(404, `Contact width id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data,
    });
 
};