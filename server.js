const path = require("path");
const express = require("express");
const session = require("express-session");
const exhbs = require("express-handlebars");
const routes = require("./controllers");
const db = require("./config/connection");
const PORT = process.env.PORT || 3077;

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();


const sessionOptions = {
  secret: "secretKey",
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db
  }),
};

app.use(session(sessionOptions));

app.engine("hbs", exhbs.engine({defaultLayout: "main", extname: "hbs"}));
app.set("view engine", "hbs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(routes);

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening to port 3077"));
});
