const path = require('path');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const uploadDir = process.env.UPLOAD_DIRECTORY;
const fileLimitSize = process.env.FILE_LIMIT_SIZE;
const uploadMaxFiles = process.env.UPLOAD_MAX_FILES;

const mimetypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "application/pdf",
    "application/msword",//Microsoft Word .docs
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", //Microsoft Word (OpenXML) .docx
    "application/vnd.ms-excel", // Microsoft excel .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",// Microsoft excel (Open XML) .xlsx
    "application/vnd.ms-powerpoint", //présentation Microsoft PowerPoint .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // présentation Microsoft PowerPoint (OpenXML) .pptx
    "application/vnd.oasis.opendocument.text", // document text OpenDocument .odt
    "application/vnd.oasis.opendocument.spreadsheet", // feuille de calcul OpenDocument .ods
];

/**
 * Configure where the file should be stored.
 */
const configureDiskStorage = () => {
    const uploadPath = path.join(__dirname, '../' + uploadDir); // Upload absolute path
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, uuidv4() + '-' + fileName)
        }
    });
}

/**
 * Configure the upload with multer
 * @param storage
 */
const configureUpload = (storage) => {
   return multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (mimetypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('The file format is not allowed! (.png, .jpeg/jpg, .pdf, .docs/docx, .xls/xlsx, .ppt/pptx, .odt, .ods)'));
            }
        },
       limits: {
           fieldSize: fileLimitSize+'MB',
           fields: uploadMaxFiles
       }
    });
}

/**
 * Uploader to use for the project
 */
const Uploader = configureUpload(configureDiskStorage());

module.exports = Uploader;// export default

