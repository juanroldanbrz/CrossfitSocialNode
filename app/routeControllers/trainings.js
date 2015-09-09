/**
 * Created by root on 7/09/15.
 */
var ownerMiddleware = require('../middleware/ownerMiddleware.js');
var Box = require('../models/box');
var Training = require('../models/training');

module.exports = function(app) {

    //Get profile info (basic info from the session)
    app.post('/trainings/newTraining', ownerMiddleware.isOwnerLogged, function (req, res) {


    });

    app.post('/trainings/removeTraining', ownerMiddleware.isOwnerLogged, function (req, res) {
        if(formValidator.isAValidInput(req,['boxId','traningId'])){
            Box.findOne({$and : [{_id:req.body.boxId},{owner:req.user._id}]},function(err,box){
                if(err)
                    throw err;
                if(!box)
                    res.send({status:'error'});
                else{
                    Training.remove({$and : [{_id:req.body.traningId},{box:req.body.boxId}]})

                }

            });
        }

    });

    app.post('/trainings/byBoxId', ownerMiddleware.isOwnerLogged, function (req, res) {
        if(formValidator.isAValidInput(req,['boxId'])){
            Box.findOne({$and : [{_id:req.body.boxId},{owner:req.user._id}]},function(err,box){
                if(err)
                    throw err;
                if(!box)
                    res.send({status:'error'});
                else{
                    Training.remove({$and : [{_id:req.body.traningId},{box:req.body.boxId}]})

                }

            });
        }

    });
}
