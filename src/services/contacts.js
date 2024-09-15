import ContactCollection from "../db/models/contact.js";

import calculatePaginationData from "../utils/calculatePaginationData.js";

export const getContacts = async ({ perPage, page }) => {
    const skip = (page - 1) * perPage;
    const contacts = await ContactCollection.find().skip(skip).limit(perPage);
    const count = await ContactCollection.find().countDocuments();

    const paginationData = calculatePaginationData({ count, perPage, page });

    return {
        page,
        perPage,
        contacts,
        totalItems: count,
        ...paginationData,
    };
};

export const getAllContactById = id => ContactCollection.findById(id);

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata:true,
        ...options,
    });

    if (!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject?.upserted),
    };
};

export const deleteContact = filter => ContactCollection.findOneAndDelete(filter);