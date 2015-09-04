/**
 * Created by root on 1/09/15.
 */
module.exports = {
    isAdminLogged:function(req, res, next){
        if(req.session.adminLogged != null && req.session.adminLogged == true)
                return next();
        else res.redirect('/admin');

    }
}