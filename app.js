const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { PORT, COOKIE_SECRET } = require("./config");
const router = require("./routes");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/adminRoutes");
const { JSONHandler } = require("./middleware/JSONHandler");
const { routeNotFound } = require("./middleware/routeNotFound");
const { upload, uploadToCloudinary } = require("./middleware/fileUpload");

app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(upload.array("picture", 6));
app.use(JSONHandler);
app.use("/api/v1", router.indexRouter);
app.use(routeNotFound);

module.exports = { app };
