const parseIntegre = (value, defaulValue) => {
    if (typeof value !== "string")
        return defaulValue;

    const parsedValue = parseInt(value);

    if (Number.isNaN(parsedValue))
        return defaulValue;

    return parsedValue;
};

const parsePaginationParams = ({ perPage, page }) => {
    const parsedPerPage = parseIntegre(perPage, 10);
    const parsedPage = parseIntegre(page, 1);

    return {
        perPage: parsedPerPage,
        page: parsedPage,
    };
};
export default parsePaginationParams;