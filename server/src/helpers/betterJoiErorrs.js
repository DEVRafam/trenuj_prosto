module.exports = (error) => {
    return error.details.map((singleError) => {
        singleError.element = singleError.path[0];
        singleError.type = singleError.type.split(".")[1];
        //
        delete singleError.context;
        delete singleError.path;
        //
        return singleError;
    });
};
