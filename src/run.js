const setup = require('./setup')
const parse = require('./parse')
const post = require('./post')
const config = require('./config')

async function run(args){

    // If setup
    if(args[0] === 'setup' || !config.hasConfig()){
        // RUN SETUP PROCESS
        await setup()
        return true
    }

    // Parse line of time report
    const postData = parse(args)

    postData.page = config.getConfig().page

    post(postData)

    return true

}

module.exports = run