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
      cb(null, false);
    }
  } catch (err) {
    err.statusCode = 400;
    cb(null, err);
  }
};

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: imageFilter,
});
