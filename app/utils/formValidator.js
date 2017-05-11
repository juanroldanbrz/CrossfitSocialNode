module.exports = {
    isAValidInput: function(req,params){
        if(req === null || params === null)
        return false;
        if(params.length===0)
        return false;

        for(var i=0;i<params.length;i++){
            if(req.body[params[i]]===null || req.body[params[i]]==='' )
            return false;
        }
        return true;
    }
};