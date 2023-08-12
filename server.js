//PATH
const path = require("path");

//EXPRESS
const express = require("express");
const expressHandlebars = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");

const app = express();
//SEQUALIZE
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//ROUTES

//HANDLEBARS
const hbs = expressHandlebars.create();

//SESSION
app.use(
	session({
		secret: "Super secret secret",
		cookie: {}, //10 minuites
		resave: false,
		saveUninitialized: true,
		store: new SequelizeStore({
			db: sequelize,
		}),
	})
);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

//INIT AND START SERVER
const PORT = process.env.PORT || 3001;
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
