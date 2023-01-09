const app = require('./app');
require('dotenv').config();

// do not change this file, this structure is necessary for project evaluation

app.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}`);
});
