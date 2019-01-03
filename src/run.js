const setup = require('./setup')
const parse = require('./parse')
const post = require('./post')
const config = require('./config')

async function run(args){

    // If setup
    if(args[0] === 'setup' || !config.hasConfig()){
        // RUN SETUP PROCESS
        await setup()
        process.exit(0)
    }

    // Parse line of time report
    const postData = parse(args)

    postData.page = config.getConfig().page

    post(postData)

    process.exit(0)

}

module.exports = run