/**
 * Created by root on 7/09/15.
 */
var ownerMiddleware = require('../middleware/ownerMiddleware.js');
var Box = require('../models/box');
var Training = require('../models/training');
var Exercise = require('../models/exercise/exercise');

var Set = require('../models/set');
var ExerciseTemplate = require('../models/exercise/exerciseTemplate');

module.exports = function(app) {

    //Get profile info (basic info from the session)
    app.post('/trainings/newTraining', ownerMiddleware.isOwnerLogged, function (req, res) {


    });

    app.post('/trainings/getExerciseList', ownerMiddleware.isOwnerLogged, function (req, res) {
        ExerciseTemplate.find({}, function (err, exerciseList) {
            var result = [];
            if(err)
            res.send({status:'error'});
            else if(exerciseList.length==0)
            res.send({status:'error'});
            else
            for(var i=0;i<exerciseList.length;i++)
                result.push({id:exerciseList[i]._id,exerciseName:exerciseList[i].exerciseName, measure : exerciseList[i].measure, others: exerciseList[i].others});
            res.send({status:'no_error',data:result});
        })


    });

    app.post('/trainings/addTraining', ownerMiddleware.isOwnerLogged, function (req, res) {
        if(formValidator.isAValidInput(req,['day','sets','maxPeople','level','description'])) {
            if(req.body.sets.length!=0){

                var newTraining = new Training();
                newTraining.date = req.body.date;
                newTraining.maxPeople = req.body.maxPeople;
                newTraining.description = req.body.description;
                newTraining.boxId = req.user.currentBox;
                newTraining.level = req.body.level;
                newTraining.sets = [];

                for(var i=0;i<req.body.sets.length;i++){
                    var set = new Set();
                    set.name= req.body.sets[i].name;
                    set.type= req.body.sets[i].type;
                    set.info= req.body.sets[i].info;
                    newTraining.sets.push(set._id);
                    set.exercises = [];

                    for(var j =0;j<req.body.sets[i].exercises.length;j++) {
                        var exercise = new Exercise();
                        set.exercises.push(exercise._id);
                        ExerciseTemplate.findById(body.sets[i].exercises[j].id, function (err, template) {
                            if (err)
                                throw err;
                            if (template) {
                                exercise.fillFromTemplate(template);
                                exercise.value = req.body.sets[i].exercises[j].value;
                                exercise.info = req.body.sets[i].exercises[j].info;
                                for (var k = 0; k < req.body.sets[i].exercises[j].others.length; k++) {
                                    exercise.others[k].value = req.body.sets[i].exercises[j].others[k];
                                }
                                exercise.save(function (err) {
                                    if (err)
                                        throw err;
                                })

                            }

                        });
                    }

                    }
                    set.save(function(err){
                        if(err)
                        throw err;

                    });

                newTraining.save(function(err){
                    if(err)
                    res.send({status:'error'});
                    else
                    res.send({status:'no_error'})
                });


                }
        }
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
