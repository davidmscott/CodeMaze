/*
	Functions for dealing with users
*/
var fs = require("fs");

var UserLog = require("./UserLog.js"); 
 
//var questions = require("./expressQuestions.json");

module.exports = function(app){

	app.post('/api/login', function(req, res){
		// TODO: Make this for more than one user
		console.log ('reached /api/login');
		if (UserLog.checkLogin(req.body.username, req.body.password)) {
			// if the user logs in, we set the session
			// variable for future requests (now the user is
			// logged in)
			// and then we say that the request was a success
			req.session.user = req.body.username;
			res.send("success");
		} else {
			// If something went wrong, we just say "error"
			res.send("error");
		}
	});


	app.post('/api/register', function(req, res){
		//shorthand variables to save us time
		var username = req.body.username;
		var password = req.body.password;
		if (UserLog.userExists(username)) {
			// If the username already exists
			if (UserLog.checkLogin(username, password)) {
				// ... and they have the right password
				// then log the user in
				req.session.user = username;
				// Send "success" so that the frontend knows
				res.send("success");
			} else {
				// Otherwise, they might be trying to
				// take a username that already exists - error!
				res.send("error");
			}
		} else {
			if(UserLog.registerUser(username, password)) {
				req.session.user = username;
				res.send("success");
			} else {
				// there was a problem registering
				res.send("error");
			}
		}
	});

/*
var testQuestion = require('./expressQuestions2.json');
console.log ("testQuestion = " + testQuestion.expressQuestions[0].down);
*/

	app.get('/api/quesSet/:id', function(req, res){
		if(UserLog.registerUser(username, password)) {
			req.session.user = username;
			if (req.params.id == 'express'){
				fs.readFile("expressQuestions.json", 'utf8', function(err, data){
					if (err){
						console.log(err);
					} else {
						res.send(data);
						console.log('data is sent');
					}
				});
			}
		}else {
			res.redirect("index.html");
		}
	});

	app.get('/api/maze/id:', function(req, res){
		if(UserLog.registerUser(username, password)) {
			req.session.user = username;
			if (req.params.id == 'express'){
				fs.readFile("mazearr.json", 'utf8', function(err, data){
					if (err){
						console.log(err);
					} else {
						res.send(data);
						console.log('data is sent');
					}
				});
			}
		}else {
			res.redirect("index.html");
		}
	});

/*
		// console.log('req.params.id' + req.params.id); 
		// if (req.params.id  == "express"){
		// 	console.log("express received and sending the file.")
		//	res.send(fs.readFileSync("expressQuestion.json")); //option 1
			//res.sendFile(__dirname+expressQuestion.json); //option 2
		// } else {
		// 	res.send("error");
		// }
	});
*/

};
