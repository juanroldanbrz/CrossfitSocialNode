var passport = require('passport');
var middleware = require('./middleware/loginMiddleware.js')

module.exports = function(app, passport) {

	require('./routeControllers/login')(app,passport);
	require('./routeControllers/profile')(app,passport);
	require('./routeControllers/admin')(app);
	require('./routeControllers/box')(app);
	require('./routeControllers/trainings')(app);

	app.get('/',function(req, res) {
		if (req.isAuthenticated()){
			if(!req.user.registerCompleted){
				res.render('gym/index',{completeRegister: true,csrf: req.csrfToken()});
			}
			else res.redirect('/main');

		}else res.render('gym/index',{csrf: req.csrfToken()});
	});

	app.get('/main',middleware.isLoggedAndFullRegistered,function(req, res) {
			res.render('gym/main', {user : req.user,csrf: req.csrfToken() });
	});

	app.post('/getCSRFToken',middleware.isLoggedAndFullRegistered,function(req, res) {
		res.send({csrf: req.csrfToken() });
	});
};

