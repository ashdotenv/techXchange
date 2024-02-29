const { PORT, DB_URI, COOKIE_SECRET } = require("./config");
const express = require("express");
const app = express();
const port = PORT || 5000;
const bodyParser = require("body-parser");
const router = require("./routes");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const { userRouter } = require("./routes/user");
const { default: mongoose } = require("mongoose");
const { adminRouter } = require("./routes/adminRoutes");
const { JSONHandler } = require("./middleware/JSONHandler");
const { routeNotFound } = require("./middleware/routeNotFound");
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Db Connected");
  })
  .catch(() => {
    console.log("Couldn't Connect to DB");
  });
 app.use(cors({
  credentials:true,
  origin:["http://localhost:3000"]
}));
  app.use(JSONHandler);
  app.use("/admin", adminRouter);
  app.use("/user", userRouter);
  app.use(router.indexRouter);
  app.use(routeNotFound);

  


app.listen(port, () => console.log(`Serving on  http://localhost:${port}`));
