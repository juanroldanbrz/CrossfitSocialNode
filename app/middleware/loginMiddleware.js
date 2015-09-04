/**
 * Created by root on 31/08/15.
 */
module.exports = {
    isLoggedAndFullRegistered : function (req, res, next)
{
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        if (!req.user.registerCompleted) {
            res.redirect('/completeData');
        }
        else return next();

    } else res.redirect('/');

    // if they aren't redirect them to the home page
},
    isLoggedIn:  function (req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

}