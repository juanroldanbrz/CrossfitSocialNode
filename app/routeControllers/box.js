var ownerMiddleware = require('../middleware/ownerMiddleware.js');
var loginMiddleware = require('../middleware/loginMiddleware.js');
var boxMiddleware = require('../middleware/boxMiddleware.js');

var formValidator = require('../utils/formValidator.js');
var User = require('../models/user');
var Box = require('../models/box');
var Training = require('../models/training');
var config = require('../../config/config');
var fs    = require('fs');

module.exports = function(app) {
    app.post('/box/createBox/newBox', ownerMiddleware.isOwnerLogged, function(req,res){
        if(formValidator.isAValidInput(req,['name','country','city','description','tariffs','address'])){

            newBox = new Box();
            newBox.name = req.body.name;
            newBox.country = req.body.country;
            newBox.city = req.body.city;
            newBox.description = req.body.description;
            newBox.tariffs = req.body.tariffs;
            newBox.address = req.body.address;
            newBox.owner = req.user._id;
            newBox.addMember(req.user._id,true);
            User.findById(req.user._id,function(err,user){
                if(err)
                    throw err;
                if(!user)
                    res.send({status:'error'});
                else
                    user.numBox = user.numBox+1;
                    user.isVerified = true;
                    user.currentBox = newBox._id;
                    req.user.currentBox = newBox._id;
                user.save(function (err) {
                    if (err)
                        throw err;
                });
            });
            if (req.files.boxPicture === null) {
                newBox.save(function (err) {
                    if (err)
                        throw err;
                    res.send({status:'no_error'});


                });
            } else{
                fs.readFile(req.files.boxPicture.path, function (err, data) {
                    var newPath = __dirname + "/../../public/img/box/" + newBox._id;

                    fs.writeFile(newPath, data, function (err) {
                        if (err)
                            throw err;
                        newBox.boxPicture = "/img/box/" + newBox._id;
                        newBox.save(function (err) {
                            if (err)
                                throw err;
                            res.send({status:'no_error'});

                        });
                    });
                });
            }
        }
        else res.send({status:'error'});
    });

    app.post('/box/modifyBox/', ownerMiddleware.isOwnerLogged, function(req,res){
        if(formValidator.isAValidInput(req,['id','country','city','description','tariffs','address'])){

            Box.find({$and : [{_id:req.body.id},{owner:req.user._id}]},function(err,box){
                if(err)
                    throw err;
                if(!box)
                    res.send({status:'error'});
                else{
                    box.address = req.body.address;
                    box.description = req.body.description;
                    box.city = req.body.city;
                    box.tariffs = req.body.tariffs;
                    box.country = req.body.country;
                    box.save(function (err) {
                    if (err)
                        throw err;
                    if (req.files.boxPicture == null) {
                        box.save(function (err) {
                            if (err)
                                throw err;
                            res.send({status:'no_error'});


                        });
                    } else{
                        fs.readFile(req.files.boxPicture.path, function (err, data) {
                            var newPath = __dirname + "/../../public/img/box/" + box._id;

                            fs.writeFile(newPath, data, function (err) {
                                if (err)
                                    throw err;
                                box.boxPicture = "/img/box/" + box._id;
                                box.save(function (err) {
                                    if (err)
                                        throw err;
                                    res.send({status:'no_error'});

                                });
                            });
                        });
                    }
                });}
            });
        }
        else res.send({status:'error'});
    });

    app.post('/box/followAndUnfollowBox', loginMiddleware.isLoggedAndFullRegistered, function(req,res){
        if(formValidator.isAValidInput(req,['id'])) {
            if (req.user.currentBox == null || req.user.currentBox == '') { //seguir box
                Box.findById(req.body.id, function (err, myBox) {
                    if (err)
                        res.send({status: 'error'});
                    else if (!myBox)
                        res.send({status: 'error'});
                    else {
                        req.user.currentBox = req.body.id;
                        myBox.addMember(req.user._id);
                        if(myBox.owner.toHexString() == req.user._id)
                            myBox.verify(req.user._id);
                        myBox.save(function (err) {
                            User.findById(req.user._id, function (err, user) {
                                if (err)
                                    res.send({status: 'error'});
                                if (!user)
                                    res.send({status: 'error'});
                                else {
                                    user.currentBox = req.body.id;
                                    user.save(function (err) {
                                        if (err)
                                            res.send({status: 'error'});
                                        else
                                            res.send({status: 'followed'});
                                    });
                                }
                            });
                        });
                    }

                });
            }
            else if (req.body.id === req.user.currentBox) { //deseguir box
                Box.findById(req.user.currentBox, function (err, myBox) {
                    if (err)
                        res.send({status: 'error'});
                    else if (myBox) {
                        req.user.currentBox = '';
                        myBox.removeMember(req.user._id);
                        myBox.save(function (err) {
                            if (err)
                                throw err;
                            User.findById(req.user._id, function (err, user) {
                                if (err)
                                    res.send({status: 'error'});
                                if (!user)
                                    res.send({status: 'error'});
                                else {
                                    user.currentBox = '';
                                    user.save(function (err) {
                                        if (err)
                                            res.send({status: 'error'});
                                        else
                                            res.send({status: 'unfollowed'});
                                    });
                                }
                            });

                        });
                    }
                    else
                        res.send({status: 'error'});
                });
            }
            else { //deseguir y seguir
                Box.findById(req.user.currentBox, function (err, myBox) {
                    if (err)
                        res.send({status: 'error'});
                    else if (myBox) {
                        req.user.currentBox = req.body.id;

                        myBox.removeMember(req.user._id);
                        myBox.save(function (err) {
                            if (err)
                                throw err;
                            Box.findById(req.body.id, function (err, myOtherBox) {
                                if (err)
                                    res.send({status: 'error'});
                                else if (!myOtherBox)
                                    res.send({status: 'error'});
                                else {

                                    myOtherBox.addMember(req.user._id);
                                    if(myOtherBox.owner.toHexString() == req.user._id)
                                        myOtherBox.verify(req.user._id);
                                    myOtherBox.save(function (err) {
                                        User.findById(req.user._id, function (err, user) {
                                            if (err)
                                                res.send({status: 'error'});
                                            if (!user)
                                                res.send({status: 'error'});
                                            else {
                                                user.currentBox = req.body.id;
                                                user.save(function (err) {
                                                    if (err)
                                                        res.send({status: 'error'});
                                                    else
                                                        res.send({status: 'followed'});
                                                });
                                            }
                                        });
                                    });
                                }

                            });

                        });
                    }
                    else
                        res.send({status: 'error'});
                });

            }
        }});

    app.post('/box/removeBox', ownerMiddleware.isOwnerLogged, function(req,res){
        if(formValidator.isAValidInput(req,['id'])) {
        Box.remove({$and : [{_id:req.body.id},{owner:req.user._id}]}, function(err, numberOfRemovedDocs) {
            if(err)
                res.send({status:'error'});
            if(numberOfRemovedDocs==1){
                Training.remove({owner:req.body.id},function(err, numberOfRemovedDocs){
                    if(err)
                        res.send({status:'error'});
                    else
                        res.send({status:'success'});
                });
            }

        });
        } else res.send({status:'error'});


    });

    app.post('/box/createBox', ownerMiddleware.isOwnerLogged, function(req,res){
        User.findById(req.user._id, function(err, myUser) {
            if(err)
                res.send({status:'error'});
            else if(!myUser)
                res.send({status:'error'});
            else if(myUser.maxBox > myUser.numBox)
                res.send({status:'success'});
            else
                res.send({status:'error',error:'You have reached the maximun number of box ('+req.user.maxBox+'). Contact with the admin'});
        });

    });

    app.post('/box/myBoxes', ownerMiddleware.isOwnerLogged, function(req,res){
        Box.find({owner:req.user._id}, function(err, boxes) {
            if(err)
                res.send({status:'error'});
            else if(!boxes || boxes.length == 0)
                res.send({status:'error'});

            else
            {
                data = [];
                for(var i=0;i<boxes.length;i++){
                    data.push({
                        id:boxes[i]._id,
                        name:boxes[i].name,
                        description:boxes[i].description,
                        tariffs:boxes[i].tariffs,
                        boxPicture:boxes[i].boxPicture,
                        city:boxes[i].city,
                        country:boxes[i].country,
                        address:boxes[i].address   });
                }
                if(data.length!=0)
                    res.send({status:'no_error',data:data});
                else res.send({status:'no_box'});

            }

        });

    });

    app.post('/box/currentBox', boxMiddleware.isFollowingABox, function(req,res){
        Box.findById(req.user.currentBox, function(err, box) {
            if(err)
                res.send({status:'error'});
            else if(!box)
                res.send({status:'error'});

            else
            {
                    data = {
                        id:box._id,
                        name:box.name,
                        description:box.description,
                        tariffs:box.tariffs,
                        boxPicture:box.boxPicture,
                        city:box.city,
                        country:box.country,
                        address:box.address,
                        members: box.members.length,
                        isOwner: (box.owner.toHexString() == req.user._id)
                    };
                res.send({status:'no_error',box:data});

            }
        });
    });

    app.post('/box/currentBox/members', boxMiddleware.isFollowingABox, function(req,res){
        Box.findById(req.user.currentBox, function(err, box) {
            if (err)
                res.send({status: 'error'});
            else if (!box)
                res.send({status: 'error'});

            else if (box.members.length === 0)
                res.send({status: 'error'});
            else{
                var searchIDS = []
                for(var i=0;i<box.members.length;i++)
                    searchIDS.push(box.members[i].user);
                User.find({_id: {$in: searchIDS}}, function (err, users) {
                    if (err)
                        res.send({status: 'error'});
                    else if (!users || users.length == 0)
                        res.send({status: 'error'});
                    else {

                        var data = [];
                        for (var i = 0; i < users.length; i++)
                            if (box.owner.toHexString() === users[i]._id)
                                data.unshift({
                                    isOwner: true,
                                    isVerified: box.isVerified(users[i]._id),
                                    id: users[i]._id,
                                    username: users[i].username,
                                    country: users[i].country,
                                    profilePic: users[i].profilePic,
                                    fullName: users[i].fullName,
                                    age: users[i].getAge()


                                });
                            else
                                data.push({
                                    isOwner: false,
                                    isVerified: box.isVerified(users[i]._id),
                                    id: users[i]._id,
                                    username: users[i].username,
                                    country: users[i].country,
                                    profilePic: users[i].profilePic,
                                    fullName: users[i].fullName,
                                    age: users[i].getAge(),
                                });

                        res.send({status: 'no_error', data: data});

                    }
                });
            }
        });
    });

    app.post('/box/lastBoxes',loginMiddleware.isLoggedAndFullRegistered, function(req,res){
       Box.find({}).sort({createdAt:-1}).limit(config.box.numberOfNewBoxesToShow).exec(function(err,boxes){
                if(err)
                throw err;
                if(!boxes || boxes.length==0)
                    res.send({status:'error'});
                else{
                    data = [];
                    for(var i=0;i<boxes.length;i++)
                    data.push({
                        id:boxes[i]._id,
                        name:boxes[i].name,
                        description:boxes[i].description,
                        tariffs:boxes[i].tariffs,
                        boxPicture:boxes[i].boxPicture,
                        city:boxes[i].city,
                        country:boxes[i].country,
                        address:boxes[i].address   });
                    res.send({status:'no_error',data:data});
                }
            });
    });

    app.post('/box/user/verify',boxMiddleware.isFollowingABox, function(req,res){
        if(formValidator.isAValidInput(req,['id'])){
            //VERIFY IF THE USER IS THE OWNER
            Box.findOne({$and : [{_id:req.user.currentBox},{owner:req.user._id}]}, function(err, box) {
                if(err)
                    res.send({status:'error'});
                if(box){
                    box.verify(req.body.id);
                    box.save(function (err) {
                       if(err)
                           res.send({status:'error'});
                        else
                           res.send({status:'no_error'});
                    });
                }
                else
                res.send({status:'error'});

            });
        }
    });

    app.post('/box/user/unVerify',loginMiddleware.isLoggedAndFullRegistered, function(req,res){
        if(formValidator.isAValidInput(req,['id'])){
            //VERIFY IF THE USER IS THE OWNER
            Box.findOne({$and : [{_id:req.user.currentBox},{owner:req.user._id}]}, function(err, box) {
                if(err)
                    res.send({status:'error'});
                if(box) {
                    if (req.body.id == req.user._id)  //No te puedes desverificar a ti mismo, carajo!
                        res.send({status: 'error'});
                    else {
                        box.unVerify(req.body.id);
                        box.save(function (err) {
                            if (err)
                                res.send({status: 'error'});
                            else
                                res.send({status: 'no_error'});
                        });
                    }
                }
                else
                    res.send({status:'error'});
            });
        }

    });

    app.post('/box/search',loginMiddleware.isLoggedAndFullRegistered, function(req,res){
        if(formValidator.isAValidInput(req,['query'])){
            Box.find({$or : [{name: { $regex: new RegExp(req.body.query,'i')  }},{city: { $regex: new RegExp(req.body.query,'i')  }},{country:{ $regex: new RegExp(req.body.query,'i')  }},{address: { $regex: new RegExp(req.body.query,'i')  }}]},function(err,boxes){
                if (err)
                    throw err;
                if (!boxes || boxes.length == 0)
                    res.send({status: 'error'});
                else {
                    data = [];
                    for (var i = 0; i < boxes.length; i++)
                        if(req.user.currentBox != null && req.user.currentBox == boxes[i]._id.toHexString())
                            data.push({
                                id: boxes[i]._id,
                                name: boxes[i].name,
                                description: boxes[i].description,
                                tariffs: boxes[i].tariffs,
                                boxPicture: boxes[i].boxPicture,
                                city: boxes[i].city,
                                country: boxes[i].country,
                                address: boxes[i].address,
                                following: true,
                            });
                        else data.push({
                            id: boxes[i]._id,
                            name: boxes[i].name,
                            description: boxes[i].description,
                            tariffs: boxes[i].tariffs,
                            boxPicture: boxes[i].boxPicture,
                            city: boxes[i].city,
                            country: boxes[i].country,
                            address: boxes[i].address,
                            following: false,
                        });
                    res.send({status: 'no_error', data: data});
                }


            });
        } else
        res.send({status:'error'});
    });
}