const chalk = require('chalk')
const fs = require('fs')
const promisify = require("node-promisify")

fs.writeFile = promisify(fs.writeFile)

const PATH = `${process.cwd()}/\.timereport-config`;

function getConfig(){

    // Make sure conf file exists
    if (fs.existsSync(PATH)) {
        const content = JSON.parse(fs.readFileSync(PATH));
        return content
    }

    console.error(chalk.red.bold('!!! No config file could be found in this directory !!!\n'))
    return false
}

async function setConfig(config){
    const err = await fs.writeFile(PATH, JSON.stringify(config))
    if(err){
        console.log(chalk.bgRed('Could not write config file'))
    }
}

function hasConfig(){
    if (fs.existsSync(PATH)) {
        return true
    }
    return false
}

module.exports = {
    getConfig: getConfig,
    setConfig: setConfig,
    hasConfig: hasConfig
}