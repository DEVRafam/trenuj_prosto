class OfferModelSchema {
    static create(DataTypes) {
        const schema = {
            destination: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
            logo: {
                type: DataTypes.STRING,
            },
            gallery: {
                type: DataTypes.TEXT,
            },
            start: {
                type: DataTypes.DATE,
            },
            end: {
                type: DataTypes.DATE,
            },
            price: {
                type: DataTypes.INTEGER,
            },
            activities: {
                type: DataTypes.TEXT,
            },
            turistBonPayment: {
                type: DataTypes.STRING,
            },
            path: {
                type: DataTypes.STRING,
            },
            slug: {
                type: DataTypes.STRING,
            },
        };
        // set allowNull property to false for all schema fields
        for (let key in schema) schema[key].allowNull = false;
        //
        return schema;
    }
}
//
//
//
module.exports = OfferModelSchema;
