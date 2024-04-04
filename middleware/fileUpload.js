const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const {
  CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("../config");

const storage = multer.diskStorage({});
const upload = multer({ storage });
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (req) => {
  return new Promise((resolve, reject) => {
    if (!req.files || req.files.length === 0) {
      reject({ message: "No files were uploaded." });
    }

    console.log(req.files);
    const uploadedFiles = [];
    const promises = [];

    req.files.forEach((file) => {
      promises.push(
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file.path, (error, result) => {
            if (error) {
              reject(error);
            } else {
              uploadedFiles.push(result.secure_url);
              resolve();
            }
          });
        })
      );
    });

    Promise.all(promises)
      .then(() => {
        resolve(uploadedFiles);
      })
      .catch((error) => {
        reject({ message: "Failed to upload files to Cloudinary.", error });
      });
  });
};

module.exports = { upload, uploadToCloudinary };
