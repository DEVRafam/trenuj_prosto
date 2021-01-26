module.exports = (query, data) => {
    // calculate range indexes
    const page = query.page * 1,
        limit = query.limit * 1;
    const start = (page - 1) * limit,
        end = start + limit;
    //
    return {
        totalPagesAmount: Math.ceil(data.length / limit),
        items: data.splice(start, end),
    };
};
