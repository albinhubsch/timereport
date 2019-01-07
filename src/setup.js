#!/usr/bin/env node
const config = require('./config')
const chalk = require('chalk')
const prompt = require('prompt')
const fs = require('fs')
const promisify = require('node-promisify')
const auth = require('./auth')
const { google } = require("googleapis");

prompt.getAsync = promisify(prompt.get)

async function setup(){

    prompt.message = null
    prompt.start()
    const { name, sid, credentials } = await prompt.getAsync([
        {
            properties: {
                name: {
                    description: chalk.green('Spreadsheet page Name (Probably your firstname)')
                }
            }
        },
        {
            properties: {
                sid: {
                    description: chalk.green('Spreadsheet id')
                }
            }
        },
        {
            properties: {
                credentials: {
                    description: chalk.green('Path to credentials')
                }
            }
        }
    ])

    const configData = {
        page: name,
        sid: sid,
        credentials: credentials
    }

    await config.setConfig(configData)

    fs.readFile(`${credentials}`, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err)
        // Authorize a client with credentials, then call the Google Sheets API.
        auth.authorize(JSON.parse(content), testReadFile);
    })

    console.log(`\n${chalk.bgGreen(" == Config saved == ")}\n`)
}

function testReadFile(auth) {
    const conf = config.getConfig()
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: conf.sid,
        range: `${conf.page}!A1:A`,
    }, async (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {

            const projects = []
            for (let index = 4; index < rows.length - 1; index++) {
                if (rows[index][0]){
                    projects.push({
                        title: rows[index][0],
                        index: index + 1
                    })
                }
            }
            
            await config.setConfig({
                ...conf,
                projects: projects
            });

            console.log(chalk.bgGreen('\n Everything works! \n'));
            process.exit(0)
        } else {
            console.log('No data found.');
        }
    });
}

module.exports = setup