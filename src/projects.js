#!/usr/bin/env node
const config = require('./config')
const { google } = require("googleapis")
const auth = require("./auth")
const fs = require("fs");
const chalk = require('chalk')

async function projects(data){

    const conf = config.getConfig()

    fs.readFile(`${conf.credentials}`, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err)
        // Authorize a client with credentials, then call the Google Sheets API.
        auth.authorize(JSON.parse(content), auth => {
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

                    projects.map( project => {
                        console.log(chalk.green(` > ${project}`))
                    })
                    return true
                } else {
                    console.log('No data found.');
                }
            })
        })
    })
}

module.exports = projects