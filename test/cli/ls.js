var program = require('commander')



var fs = require('fs');

var chalk = require('chalk')

program
.arguments('<dirname>')
.option('-dir, --direction')
.action(function(dirname){
    let files = fs.readdirSync(dirname)
    if(this.direction){
        let str = '';
        files.forEach(file => {

            let f = fs.statSync(dirname + '/' + file)

            if(f.isDirectory()){
                
                str += chalk.yellow( file + '\r\n' )
            }else{
                str += chalk.red( file + '\r\n' )
            }
        });

        console.log( str )
    }else{
        console.log(files)
    }
})


process.argv.push(__dirname)


// 模拟一个window dir 命令
program.parse(process.argv)


