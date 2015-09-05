/**
 * Created by root on 2/09/15.
 */
var ownerMiddleware = require('../middleware/ownerMiddleware.js');
var loginMiddleware = require('../middleware/loginMiddleware.js');
var formValidator = require('../utils/formValidator.js');
var User = require('../models/user');
var Box = require('../models/box');
var config = require('../../config/config');
var fs    = require("fs");

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
            User.findById(req.user._id,function(err,user){
                if(err)
                    throw err;
                if(!user)
                    res.send({status:'error'});
                else
                    user.numBox = user.numBox+1;
                user.save(function (err) {
                    if (err)
                        throw err;
                    if (req.files.boxPicture == null) {
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
                });



            });



        }
        else res.send({status:'error'});
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
                        data.push({
                            name: boxes[i].name,
                            description: boxes[i].description,
                            tariffs: boxes[i].tariffs,
                            boxPicture: boxes[i].boxPicture,
                            city: boxes[i].city,
                            country: boxes[i].country,
                            address: boxes[i].address
                        });
                    res.send({status: 'no_error', data: data});
                }


            });
        } else
        res.send({status:'error'});

    });
}