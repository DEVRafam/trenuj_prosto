class EventModelSchema {
    static create(DataTypes) {
        const schema = {
            title: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.TEXT,
            },
            images: {
                type: DataTypes.TEXT,
            },
            logo: {
                type: DataTypes.STRING,
            },
            path: {
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
module.exports = EventModelSchema;
