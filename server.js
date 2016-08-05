var express = require('express');

var session = require('express-session');

var app = express();

var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
	secret: 'OurKey',
	resave: false,
	saveUninitialized: false
}));

var addRoutesPages = require("./routes_pages.js");
addRoutesPages(app);

var addAPIRoutes = require('./routes_api.js');
addAPIRoutes(app);

app.use(express.static("public"));

app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/api", function(req, res) {
	res.send("success");
});

app.use(express.static("public"));

app.listen(PORT, function() {
	console.log("Navigate the maze on port " + PORT);
});

