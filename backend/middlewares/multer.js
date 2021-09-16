const multer = require("multer");
// const { v4 } = require("uuid");

const imageFilter = (req, file, cb) => {
  try {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      throw new Error("please upload an image file: Unacceptable file format");
    }
  } catch (err) {
    err.statusCode = 400;
    cb(null, err);
  }
};

// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, v4() + "-" + file.originalname);
//   },
// });

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: imageFilter,
  limits: { fileSize: 500000 },
});
