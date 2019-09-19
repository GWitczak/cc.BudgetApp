const express = require('express');
const app = express();

require('./startup/setHeaders')(app)
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);
require('./startup/swagger/swagger')(app);


const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;