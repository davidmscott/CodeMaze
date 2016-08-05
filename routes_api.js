/*
	Functions for dealing with users
*/
var UserLog = require("./UserLog.js"); 

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
				// it is ok to redirect to /map
				res.send("success");
			} else {
				// Otherwise, they might be trying to
				// take a username that already exists - error!
				res.send("error");
			}
		} else {
			// Username is not taken, register a new user
			// and log them in - success!
			if(UserLog.registerUser(username, password)) {
				req.session.user = username;
				// Send "success" so that the frontend knows
				// it is ok to redirect to /map
				res.send("success");
			} else {
				// there was a problem registering
				res.send("error");
			}
		}
	});
};
