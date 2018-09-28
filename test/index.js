var http = require('http');

var fs = require('fs');

var RootDir = __dirname + '/html/';


var url = require('url')

var qs = require('querystring')

var server = http.createServer();

server.on('error', function(err){
    console.log(err)
})

server.on('listening', function(){
    console.log('listening')
})

server.on('request', function(req, res){

    
    var urlStr = url.parse(req.url)

    switch (urlStr.pathname) {
        case '/' : 
            console.log(RootDir)
            resData(RootDir + 'index.html', res)
            
            break;
        
        case '/user': 
        resData(RootDir + 'user.html', res)
            break;

        case '/login/check':
            res.writeHead(200, {
                'content-type': 'text/html'
            })
            var str = ''
            req.on('data', function(chunk){
                str += chunk;
            })
            req.on('end', function(){

                res.end(qs.parse( str ));
            })
            break;
        
        default: 

            resData(RootDir + 'notFound.html', res)
            break;
    }
})

function resData(file, res){

    fs.readFile(file, function(err, data){
        if( err ){
            res.writeHead(404, {
                'content-type': 'text/html'
            })
        }else{
            res.writeHead(200, {
                'content-type': 'text/html'
            })
        }
        res.end(data);
    })

}

server.listen(8080);