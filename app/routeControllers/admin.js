/**
 * Created by root on 1/09/15.
 */
var bcrypt   = require('bcrypt-nodejs');
var config = require('../../config/config');
var middleware = require('../middleware/adminMiddleware.js')
var User = require('../models/user');
var formValidator = require('../utils/formValidator.js');
var Box = require('../models/box');
var setTemplate = require('../models/exercise/exerciseTemplate');

module.exports = function(app) {
    app.get('/admin', function (req, res) {
        if(req.session.adminLogged!=null && req.session.adminLogged ==true)
            res.redirect('/admin/main');
        else
            res.render('gym/admin/index');
    });
    app.post('/admin', function (req, res) {
        if(req.body.username != '' && req.body.username != null && req.body.password != '' &&  req.body.password != null) {
            if(config.admin.user == req.body.username)
                if( bcrypt.compareSync(req.body.password, config.admin.pass)) {
                    req.session.adminLogged = true;
                    req.session.save();
                    res.render('gym/admin/main');
                }
        }else res.redirect('/admin');
    });

    app.get('/admin/main',middleware.isAdminLogged,function (req, res) {
        res.render('gym/admin/main');
    });


    app.post('/admin/addExercise',middleware.isAdminLogged,function (req, res) {
        if(formValidator.isAValidInput(req,['name','measure'])){
            //validate input
            setTemp = new setTemplate();
            if(req.body.others != null && req.body.others!=''){
                var inputWithoutWhiteSpaces = req.body.others.replace(/ /g, "");
                var othersArray = inputWithoutWhiteSpaces.split(';');
                if(othersArray.length==0)
                    res.send({status:'error'});

                var othersToSave = [];
                for(var i=0; i<othersArray.length;i++)
                    if(othersArray.length!=0){
                        nameAndMeasure = othersArray[i].split(':');
                        if(nameAndMeasure.length==2)
                            othersToSave.push({name:nameAndMeasure[0],measure:nameAndMeasure[1]});

                    }

                setTemp.others = othersToSave;

            }
            setTemp.exerciseName = req.body.name;
            setTemp.measure = req.body.measure;
            setTemp.save(function(err){
                if(err)
                res.send({status:'error'});
                else
                res.send({status:'success'});
            });



        }

    });
    app.post('/admin/addNumberOfBox',middleware.isAdminLogged,function (req, res) {
        if(formValidator.isAValidInput(req,['email','maxBox']) && !isNaN(req.body.maxBox))
        {
            User.findOne({email:req.body.email},function(err,user) {
                if (err)
                    throw err;
                if (!user)
                    res.send({status: 'error'});
                else {
                    user.maxBox = req.body.maxBox;
                    user.save(function (err) {
                        if (err)
                            throw err;
                        res.send({status: 'no_error'});
                    });
                }
            });
        }
        else
        res.send({status:'error'});


            });

    app.post('/admin/changeBoxName',middleware.isAdminLogged,function (req, res) {
        if(formValidator.isAValidInput(req,['boxName','newName']))
        {
            Box.findOne({name:req.body.boxName},function(err,box) {
                if (err)
                    throw err;
                if (!box)
                    res.send({status: 'error'});
                else {
                    box.name = req.body.newName;
                    box.save(function (err) {
                        if (err)
                            throw err;
                        res.send({status: 'no_error'});
                    });
                }
            });
        }
        else
            res.send({status:'error'});


    });


        app.post('/admin/addPrivileges',middleware.isAdminLogged,function (req, res) {
        if(formValidator.isAValidInput(req,['email','isOwner']) && req.body.isOwner==0 || req.body.isOwner==1){
            User.findOne({email:req.body.email},function(err,user){
                if(err)
                    throw err;
                if(!user)
                    res.send({status:'error'});
                else
                {
                    if(req.body.isOwner == 1)
                    user.isOwner = true;
                    else if(req.body.isOwner == 0)
                    user.isOwner = false;

                    user.save(function (err) {
                        if (err)
                            throw err;
                        res.send({status:'no_error'});
                    });

                }
            });


            }
        else res.send({status:'error'});
    });
    app.get('/admin/logout',middleware.isAdminLogged,function (req, res) {
        req.session.adminLogged = false;
        res.redirect('/admin');

    });

    app.post('/admin/search/email',middleware.isAdminLogged,function (req, res) {
        if(req.body.email != null && req.body.email != '')
        {
        User.findOne({email:req.body.email},function(err,user){
            if(err)
            throw err;
            if(!user)
            res.send({status:'error'});
            else
            {
                var userProfile = {
                    status: 'no_error',
                    username: user.username,
                    fullName: user.fullName,
                    email: user.email,
                    country: user.country,
                    phone: user.phone,
                    profilePic : user.profilePic,
                    birthdate: user.birthdate,
                    isOwner: user.isOwner,
                    numBox: user.numBox,
                    maxBox: user.maxBox
                    };

                res.send(userProfile);
            }


        });
        }
        else res.send({status:'error'});
    });




    app.post('/admin/searchUser',middleware.isAdminLogged,function (req, res){
        if(formValidator.isAValidInput(req,['query'])){
            User.find({$or : [{username: { $regex: new RegExp(req.body.query)  }},{email:{ $regex: new RegExp(req.body.query)  }},{fullName: { $regex: new RegExp(req.body.query,'i')  }}]},function(err,user){
                if(err)
                    throw err;
                if(!user || user.length==0)
                     res.send({status:'no_user'});
                else
                {
                    data = [];
                    for(var i=0;i<user.length;i++){
                        if(user[i].email != null && user[i].email != undefined && user[i].email != '')
                        data.push({username:user[i].username,email:user[i].email,fullName: user[i].fullName});
                    }
                    if(data.length!=0)
                    res.send({status:'no_error',data:data});
                    else res.send({status:'no_user'});

                }
            });
        }
        else res.send({status:'error'});
    });

    app.post('/admin/searchBox',middleware.isAdminLogged,function (req, res){
        if(formValidator.isAValidInput(req,['query'])){
            Box.find({$or : [{name: { $regex: new RegExp(req.body.query,'i')  }},{city:{ $regex: new RegExp(req.body.query)  }},{location: { $regex: new RegExp(req.body.query,'i')  }}]},function(err,boxes){
                if(err)
                    throw err;
                if(!boxes || boxes.length==0)
                    res.send({status:'no_box'});
                else
                {
                    data = [];
                    for(var i=0;i<boxes.length;i++){
                        data.push({
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
        }
        else res.send({status:'error'});
    });
}
