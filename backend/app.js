const express = require("express");
const app = express();
const { PORT, DB_URI, COOKIE_SECRET } = require("./config"); //
const bodyParser = require("body-parser");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/user");
const { default: mongoose } = require("mongoose");
const { adminRouter } = require("./routes/adminRoutes");
const { JSONHandler } = require("./middleware/JSONHandler");
const { routeNotFound } = require("./middleware/routeNotFound");
const cors = require("cors");
const { upload, uploadToCloudinary } = require("./middleware/fileUpload");
app.use(cookieParser(COOKIE_SECRET)); //using Cookie middleware with SECRET for signed Cookies
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
); // using cors for fetching data outside of localhost  {1}

app.use(upload.array("picture", 6)); //multer middleware to get file
app.use(uploadToCloudinary); // cloudinary middleware to upload file to cloudinary

app.use(JSONHandler); //JSON handler middleware to make sure JSON data

app.use("/admin", adminRouter); //admin route
app.use("/user", userRouter); //user route
app.use("/api/v1/", router.indexRouter); //index route
app.use(routeNotFound); //404 middleware

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Db Connected");
  })
  .catch(() => {
    console.log("Couldn't Connect to DB");
  });
//DB Connection
//initializaing Server

app.listen(PORT, () => console.log(`Serving on  http://localhost:${PORT}`));
module.exports = { app };
