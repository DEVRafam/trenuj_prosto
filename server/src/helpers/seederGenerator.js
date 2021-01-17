const fse = require("fs-extra");
const path = require("path");
//
module.exports = (Modal, data, paths = false) => {
    return {
        up: async () => {
            // copy images
            if (paths) {
                const { imagesTemplate, uploadDir } = paths;
                data.forEach((singleEvent) => {
                    const src = path.join(imagesTemplate, singleEvent.path);
                    const dest = path.join(uploadDir, singleEvent.path);
                    fse.copySync(src, dest);
                });
            }
            // bulk insertion
            await Modal.bulkCreate(data);
        },
        //
        down: async () => {},
    };
};
