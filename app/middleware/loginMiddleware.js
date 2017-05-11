module.exports = {
    isLoggedAndFullRegistered : function (req, res, next)
{
    if (req.isAuthenticated()) {
        if (!req.user.registerCompleted) {
            res.redirect('/completeData');
        }
        else return next();

    } else res.redirect('/');
},
    isLoggedIn:  function (req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
    }
};