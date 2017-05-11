var boxMiddleware = require('../middleware/boxMiddleware.js');
var ownerMiddleware = require('../middleware/ownerMiddleware.js');
var Box = require('../models/box');
var Training = require('../models/training');
var Level = require('../models/level');
var Exercise = require('../models/exercise/exercise');
var formValidator = require('../utils/formValidator.js');
var Set = require('../models/set');
var ExerciseTemplate = require('../models/exercise/exerciseTemplate');

module.exports = function(app) {

    app.post('/trainings/getExerciseList', ownerMiddleware.isOwnerLogged, function (req, res) {
        ExerciseTemplate.find({}, function (err, exerciseList) {
            var result = [];
            if(err)
            res.send({status:'error'});
            else if(exerciseList.length==0)
            res.send({status:'error'});
            else
            for(var i=0;i<exerciseList.length;i++)
                result.push({id:exerciseList[i]._id,exerciseName:exerciseList[i].exerciseName, measure : exerciseList[i].measure, others: exerciseList[i].others, canBePosted : exerciseList[i].canBePosted });
            res.send({status:'no_error',data:result});
        })
    });

    app.post('/trainings/getTrainingList', boxMiddleware.isFollowingABox, function (req, res) {
        Training.find({boxId:req.user.currentBox}).sort({createdAt:-1}).limit(10).exec(function (err,trainings) {
            if (err)
                res.send({status: 'error'});
            else if(trainings.length>0) {
                var ret = [];
                for (var i = 0; i < trainings.length; i++)
                ret.push({name:trainings[i].name,date:trainings[i].date,id:trainings[i]._id});
                res.send({status:'no_error',data:ret});
            }
            else res.send({status: 'error'});
            });
    });

    app.post('/trainings/getTraining', ownerMiddleware.isOwnerLogged, function (req, res) {
        if(formValidator.isAValidInput(req,['query'])) {
            Training.findById(req.body.query,function(err,training){
                if(err)
                res.send({status:"error"});
                else if(training!==null){
                    var send = {
                        name:training.name,
                        date:training.date,
                        maxPeople : training.maxPeople,
                        description : training.description,
                        level: training.level,
                        sets:[]
                    };
                    for(var i=0;i<training.sets.length;i++){
                        Set.findById(training.sets[i],function(err,set){
                            if(err)
                            res.send({status:'error'})
                            else if(set){
                            send.sets[this.i] = {name:set.name,type:set.type,info:set.info,time:set.time,repetitions:set.repetitions,exercises:[]};
                            for (var j=0;j<set.exercises.length;j++){
                                Exercise.findById(set.exercises[j], function (err,exercise) {
                                    if(err)
                                    res.send({status:'error'});
                                    else {
                                        send.sets[this.i].exercises[this.j] = {
                                            exerciseName: exercise.exerciseName,
                                            measure: exercise.measure,
                                            value: exercise.value,
                                            others: exercise.others,
                                            info: exercise.info
                                        }
                                        if(this.i==training.sets.length-1 && this.j == set.exercises.length-1)
                                            res.send({status:"no_error",data:send});
                                    }

                                }.bind({j:j,i: this.i}))
                            }}
                        }.bind( {i: i} ));
                    }
                    }});
        }
    });

    app.post('/trainings/getTrainingToPost', ownerMiddleware.isOwnerLogged, function (req, res) {
        if(formValidator.isAValidInput(req,['query'])) {
            Training.findById(req.body.query,function(err, training){
                if(err)
                    res.send({status:"error"});
                else if(training!==null){
                    var send = {
                        sets:[]
                    }
                    for(var i=0;i<training.sets.length;i++){
                        Set.findById(training.sets[i],function(err,set){
                            if(err)
                                res.send({status:'error'})
                            else if(set){
                                send.sets[this.i] = {
                                    name:set.name,type:set.type,
                                    info:set.info,time:set.time,
                                    repetitions:set.repetitions,exercises:[]
                                };

                                for (var j=0;j<set.exercises.length;j++){
                                    Exercise.findById(set.exercises[j], function (err,exercise) {
                                        if(err)
                                            res.send({status:'error'});
                                        else {
                                            if(send.sets[this.i].exercises[this.j].wantToBePosted)
                                            send.sets[this.i].exercises[this.j] = {
                                                exerciseName: exercise.exerciseName,
                                                toPost : exercise.toPost,
                                            }
                                            if(this.i==training.sets.length-1 && this.j == set.exercises.length-1)
                                                res.send({status:"no_error",data:send});
                                        }
                                    }.bind({j:j,i: this.i}))
                                }
                            }

                        }.bind( {i: i} ));
                    }
                }});
        }
    });

    app.post('/trainings/addTraining', ownerMiddleware.isOwnerLogged, function (req, res) {
        if(formValidator.isAValidInput(req,['date','sets','maxPeople','level','description'])) {
            if(req.body.sets.length!==0){

                var newTraining = new Training();
                newTraining.date = req.body.date;
                newTraining.maxPeople = req.body.maxPeople;
                newTraining.description = req.body.description;
                newTraining.boxId = req.user.currentBox;
                newTraining.level = req.body.level;
                newTraining.name = req.body.name;
                var exercisesToSave = new Array(req.body.sets.length);
                for(var i=0;i<exercisesToSave.length;i++)
                    exercisesToSave[i] = new Array(req.body.sets[i].exercises.length);

                var set = new Array(req.body.sets.length);

                for(var i=0;i<req.body.sets.length;i++){
                    set[i] = new Set();
                    set[i].name= req.body.sets[i].name;
                    set[i].type= req.body.sets[i].type;
                    set[i].info= req.body.sets[i].info;
                    set[i].time= req.body.sets[i].time;
                    set[i].repetitions= req.body.sets[i].repetitions;

                    newTraining.sets.push(set[i]._id);
                    set[i].exercises = [];

                    for(var j =0;j<req.body.sets[i].exercises.length;j++) {
                        exercisesToSave[i][j] = new Exercise();
                        if(exercisesToSave[i][j]._id!=null)set[i].exercises.push(exercisesToSave[i][j]._id);
                        ExerciseTemplate.findById(req.body.sets[i].exercises[j].exerciseId, function (err, template) {
                            if (err)
                                throw err;
                            if (template) {
                                exercisesToSave[this.i][this.j].fillFromTemplate(template);

                                if(exercisesToSave[this.i][this.j].canBePosted)
                                exercisesToSave[this.i][this.j].wantToBePosted = req.body.sets[this.i].exercises[this.j].wantToBePosted;

                                exercisesToSave[this.i][this.j].value = req.body.sets[this.i].exercises[this.j].exerciseValue;
                                exercisesToSave[this.i][this.j].info = req.body.sets[this.i].exercises[this.j].exerciseInfo;
                                if(req.body.sets[this.i].exercises[this.j].others!=null)
                                for (var k = 0; k < req.body.sets[this.i].exercises[this.j].others.length; k++) {
                                    exercisesToSave[this.i][this.j].others[k].value = req.body.sets[this.i].exercises[this.j].others[k];
                                }
                                exercisesToSave[this.i][this.j].save(function (err) {
                                    if (err)
                                        throw err;
                                })

                            }

                        }.bind( {i: i,j:j} ));
                    }
                    set[i].save(function(err){
                        if(err)
                            throw err;
                    });
                    }
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
