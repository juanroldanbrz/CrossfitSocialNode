module.exports = {
    isOwnerLogged:function(req, res, next){
        if(!req.isAuthenticated())
            res.redirect('/');
        else if(!req.user.isOwner)
            res.redirect('/main');
        else
            return next();

    }
};