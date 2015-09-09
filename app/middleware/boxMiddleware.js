/**
 * Created by root on 8/09/15.
 */
module.exports = {
    isFollowingABox:function(req, res, next){
        if(!req.isAuthenticated())
            res.send({status:'error'});
        else if(!req.user.currentBox || req.user.currentBox == '')
            res.send({status:'error'});
        else
            return next();

    }
}