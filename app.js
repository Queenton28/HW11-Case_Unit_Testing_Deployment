const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const db = require('./models');

app.use(bodyParser.json());
app.use('/api', routes);

const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = app;
