var program = require('commander')
var fs = require('fs');
var chalk = require('chalk')

program
.command('create <project-name>')
.description('add a project name')
.action(function(name){
    let projectPath = __dirname + '/' + name

    if(fs.existsSync(projectPath)){
        console.log(chalk.red('project-name has aleardy exit ' + name))
        return
    }
    
    fs.mkdirSync(projectPath)

    console.log(chalk.yellow('create a new project name ' + name))

    fs.writeFileSync(projectPath + '/' + 'index.html')

    console.log(chalk.yellow('create index page ' + name))

})

program.parse(process.argv)