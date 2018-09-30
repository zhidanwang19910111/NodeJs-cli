var mongoose = require('mongoose');


//用户的表结构

var Schema = mongoose.Schema;


var userSchema = new Schema({
    username: String,
    passwork: String
})

module.exports = userSchema;