const fs = require("fs");

const deleteImage = async (imagePath) => {
  try {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = deleteImage;
