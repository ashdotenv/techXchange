//initializaing Server
const express = require('express');
const { PORT } = require('./config');
const app = express();
const port = PORT || 5000;
app.listen(port, () => console.log(`Serving on  http://localhost:${port}`));
module .exports ={app}