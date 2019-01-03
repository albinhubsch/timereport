const config = require('./config')
const chalk = require('chalk')
const rl = require('readline')
const prompt = require('prompt')
const promisify = require("node-promisify")

prompt.getAsync = promisify(prompt.get)

async function setup(){

    prompt.message = null
    prompt.start()
    const { name, url } = await prompt.getAsync([
        {
            properties: {
                name: {
                    description: chalk.green('Spreadsheet page Name (Probably your firstname)')
                }
            }
        },
        {
            properties: {
                url: {
                    description: chalk.green('Server url')
                }
            }
        }
    ])

    const configData = {
        page: name,
        url: url
    }

    await config.setConfig(configData)

    console.log(`\n${chalk.bgGreen(" == Config saved == ")}\n`)
}

module.exports = setup