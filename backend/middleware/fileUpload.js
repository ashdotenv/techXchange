const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require("../config");

const storage = multer.diskStorage({});
const upload = multer({ storage });
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next({ error: "No files were uploaded." });
  }

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
      req.body.picture = uploadedFiles;
      next();
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to upload files to Cloudinary." });
    });
};

module.exports = { upload, uploadToCloudinary };
