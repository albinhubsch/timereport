const setup = require('./setup')
const parse = require('./parse')
const post = require('./post')
const config = require('./config')
const chalk = require('chalk')

async function run(args){

    // If setup
    if(args[0] === 'setup' || !config.hasConfig()){
        // RUN SETUP PROCESS
        await setup()
        return true
    }

    if (args[0] === 'help' || !config.hasConfig()) {
        // RUN SETUP PROCESS
        console.log(chalk.blue("\n setup - Run setup process\n projects - Lists all available projects that can be time reported\n <project> <duration> [<date(today, idag, yesterday, igår, YYYY-MM-DD)>]\n"));
        return true
    }

    if (args[0] === 'projects' || !config.hasConfig()) {
        // RUN SETUP PROCESS
        const conf = config.getConfig()
        console.log('')
        conf.projects.map( project => {
            console.log(chalk.blue(` - ${project.title}`))
        })
        console.log('')
        return true
    }

    // Parse line of time report
    const postData = parse(args)

    postData.page = config.getConfig().page

    post(postData)

    return true

}

module.exports = run