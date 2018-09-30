var express = require('express');

var router = express.Router();

// var mongodb = require('mongodb')

var userModel = require('../models/user.js')

var responseData;
router.use( function(req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }

    next();
} );


//注册逻辑

/**
 * 1.用户名不能为空 ，密码，确认密码不能为空
 * 
 * 2.两次密码是够一致
 * 
 * 3.查询用户是否被注册了
 * 
 *      数据库查询
 * 
 */
router.post('/user/register', function(req, res, next){
    var reqData = req.body;
    var username = reqData.username;
    var password = reqData.password;
    var repassword = reqData.repassword;

    
    //判断用户名是否为空
    if( username == ''){
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    //密码不能为空
    if( password == ''){
        responseData.code = 1;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }

    //两次输入的密码不一致
    if( password !==  repassword){
        responseData.code = 1;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return;
    }

    // 判断当前用户是否被注册
    // console.log(mongodb.Db)
    userModel.findOne({
        username: username
    })
    .then(function(userInfo){
        console.log(userInfo)

        if( userInfo ){
            responseData.code = 1;
            responseData.message = '用户已经被注册了';
            res.json(responseData)
            return;
        }

        let user = new userModel({
            username: username,
            password: password
        });
        return user.save();
    })
    .then(function(newUserInfo){
        //注册成功
        responseData.code = 1;
        responseData.message = '注册成功';
        res.json(responseData)
    })


})

module.exports = router;