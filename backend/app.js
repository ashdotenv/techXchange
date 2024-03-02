const { PORT, DB_URI, COOKIE_SECRET } = require("./config");
const express = require("express");
const app = express();
const port = PORT || 5000;
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

app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(upload.array("picture", 6));
app.use(uploadToCloudinary);

app.use(JSONHandler);

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use(router.indexRouter);
app.use(routeNotFound);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Db Connected");
  })
  .catch(() => {
    console.log("Couldn't Connect to DB");
  });

// Server listening
app.listen(port, () => console.log(`Serving on  http://localhost:${port}`));
