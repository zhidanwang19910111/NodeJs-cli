var program = require('commander')

program
.version('1.0.0')

.usage('i am a introcution')

// .arguments('<v>')

.option('-n, --number [v]', 'number type', function(val){
    //调用该命令处理的事情

    console.log('log output ' + val)
})


//类似于  vue create 子命令
program
.command('create <project-name>')
.description('create new application')
.usage('this is create commonader')
.action(function(a){
    console.log('new project-name ' + a)
})
program.parse(process.argv)