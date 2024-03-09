const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT, DB_URI, COOKIE_SECRET } = require("./config");
const router = require("./routes");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/adminRoutes");
const { JSONHandler } = require("./middleware/JSONHandler");
const { routeNotFound } = require("./middleware/routeNotFound");
const { upload, uploadToCloudinary } = require("./middleware/fileUpload");

const app = express();
const port = PORT || 5000;


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
app.use(uploadToCloudinary);
app.use(JSONHandler);

router.indexRouter.use("/admin", adminRouter);
router.indexRouter.use("/user", userRouter);
app.use("/api/v1", router.indexRouter);
app.use(routeNotFound);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Db Connected");
    app.listen(port, () => console.log(`Serving on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error("Couldn't Connect to DB:", error);
  });

module.exports = { app };
