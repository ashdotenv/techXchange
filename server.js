const { default: mongoose } = require("mongoose");
const { app } = require("./app");
const { PORT, DB_URI } = require("./config");
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Db Connected");
    app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("Couldn't Connect to DB:", error);
  });