var passport = require('passport');
var middleware = require('./middleware/loginMiddleware.js')

module.exports = function(app, passport) {

	require('./routeControllers/login')(app,passport);
	require('./routeControllers/profile')(app,passport);
	require('./routeControllers/admin')(app);
	require('./routeControllers/box')(app);
	require('./routeControllers/trainings')(app);



	// =====================================
	// HOME PAGE ========
	// =====================================
	app.get('/',function(req, res) {
		if (req.isAuthenticated()){
			if(!req.user.registerCompleted){
				res.render('gym/index',{completeRegister: true});
			}
			else res.redirect('/main');

		}else res.render('gym/index');
			//sessionUsername = req.user.username;
			//res.render('gym/index', {isLogged: true, username: "JUAN"});

	});

	app.get('/main',middleware.isLoggedAndFullRegistered,function(req, res) {
			res.render('gym/main', {user : req.user });
	});

};

