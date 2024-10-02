import ContactCollection from "../db/models/contact.js";

import calculatePaginationData from "../utils/calculatePaginationData.js";

import { SORT_ORDER } from "../constants/index.js";

export const getContacts = async ({
    perPage,
    page,
    sortBy = "_id",
    filter = {},
    sortOrder = SORT_ORDER[0],
}) => {
    const skip = (page - 1) * perPage;
    const contactQuery = ContactCollection.find();

    if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
      contactQuery.where('contactType').equals(filter.contactType);
  }
  
    if (filter.userId) {
        contactQuery.where("userId").equals(filter.userId);
  }    

    const contacts = await contactQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    
    const count = await ContactCollection.find().merge(contactQuery).countDocuments();

    const paginationData = calculatePaginationData({ count, perPage, page });

    return {
        page,
        perPage,
        contacts,
        totalItems: count,
        ...paginationData,
    };
};

export const getAllContactById = filter => ContactCollection.findById(filter);

export const createContact = payload => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
    const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
        includeResultMetadata:true,
        ...options,
    });

    if (!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteContact = filter => ContactCollection.findOneAndDelete(filter);