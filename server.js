require('dotenv').config()
const config = require("./src/config/config.js")
const serverless = require('serverless-http');
let express = require('express');
const {I18n} = require('i18n');
const path = require('path')
let cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

//khởi tạo i18n
const i18n = new I18n({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'vi'
})

app.use(i18n.init);

//connect to routes
require("./src/api/routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports.handler = serverless(app);

