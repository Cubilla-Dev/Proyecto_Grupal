const multer = require("multer");
const fs = require('fs-extra');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        /* const path = `${process.env.UPLOADS_FOLDER}/${req.user.userId}`; */
        const path = `${process.env.UPLOADS_FOLDER}`;
        /* Buscar el path, si no exite lo crea */
        fs.mkdirsSync(path);
        console.log(path);
        cb(null, path)
    },
    filename: (req, file, cb) => {
        console.log(file);
        console.log(`${file.originalname.split(".")[0]}.${file.mimetype.split("/")[1]}`);
        cb(null, `${file.originalname.split(".")[0]}.${file.mimetype.split("/")[1]}`);
    },
});
const fileFilter = (req, file, cb) => {
    console.log("FILTER");
    const allowedFileTypes = ['image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.log("ERROR");
        cb(null, false);
        cb(new Error('File extension not supported'))
    }
}

module.exports.upload = multer({/*  storage: storage, */ fileFilter: fileFilter });