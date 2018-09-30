//应用程序的入口文件
var express = require('express');
// 渲染模板引擎
var swig = require('swig');
//链接数据库
var mongoose = require('mongoose');


//加载body-parser  用来处理post提交过来的数据
var bodyParser = require('body-parser');


//创建app应用   ==> 等同于Node.Js 的http server
var app = express();

//设置静态文件托管, 当访问的的文件以public 文件 以静态文件public访问

app.use('/public', express.static(__dirname + '/public'))

//定义当前应用的模板引擎   swig.renderFile 用于处理模板文件a

app.engine('html', swig.renderFile)

// 设置模板文件的存放的目录   参数一 必须是views ，  参数二是目录

app.set('views', './views')


//注册所使用的模板引擎，第一个参数是view engine,  第二个参数和  定义模板引擎的名称一致

app.set('view engine', 'html')


// 测试环境清除掉模板引擎的缓存
swig.setDefaults({cache: false})


/**
 * 
 * 首页路由
 */
// app.get('/', function(req, res, next){
//     //引擎模板，读取指定目录下的文件，并返回客户端
//     //render 方法，第一个参数表示模板文件 ，相对于views 目录
//     res.render('index')
// })

//bodyparser 设置

app.use(bodyParser.urlencoded({extended: true}));
/**
 * 根据不同功能划分模块
 */

 app.use('/admin', require('./routers/admin'))
 app.use('/api', require('./routers/api'))
 app.use('/', require('./routers/main'))




//  useNewUrlParser=true
 //链接数据库
//?useNewUrlParser=true

// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/blog";
 
mongoose.connect(url, { 'useNewUrlParser': true }, function(err, db) {
  if (err) throw err;
  console.log("数据库已连接!");
  //监听http请求
        
  app.listen(8888)
//   db.close();
});







