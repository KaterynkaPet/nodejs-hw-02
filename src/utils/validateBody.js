import createError from "http-errors";

const validateBody = schema => {
    const func = async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, {
                abortEarly: false,
            });
            next();
        }
        catch(error) {
            const validateError = createError(400, error.message);
            next(validateError);
        }
    };
    return func;
};

export default validateBody;