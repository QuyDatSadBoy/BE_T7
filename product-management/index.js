const express = require("express");
const path = require("path");
var bodyParser = require('body-parser')
const methodOverride = require("method-override");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// End TinyMCE


// Connect MongoDB
const database = require("./config/database");
database.connect();
// End Connect MongoDB

//App locals Variable
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//End App Locals Variable

app.use(bodyParser.urlencoded({ extended: false }));

// methodOverride
app.use(methodOverride('_method'));

// End methodOverride

// Setup Pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
// End Setup Pug

// Biến env
const PORT = process.env.PORT;
// End Biến env


//Express Flash
app.use(cookieParser('dat09'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End Express Flash

// Route 
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
route(app);
routeAdmin(app);
// End Route

app.listen(PORT, () => {
  console.log(`Đã chạy thành công vào công ${PORT}`)
});