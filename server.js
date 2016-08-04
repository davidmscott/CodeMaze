var express = require("express");

var app = express();

var PORT = process.env.PORT || 8000;

var session = require('express-session');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
	secret: "Our Key",
	resave: false,
	saveUninitialized: false
}));

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
