const axios = require('axios')
const config = require('./config')
const { google } = require("googleapis")
const auth = require("./auth")
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')

async function post(data){

    const conf = config.getConfig()

    fs.readFile(`${conf.credentials}`, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err)
        // Authorize a client with credentials, then call the Google Sheets API.
        auth.authorize(JSON.parse(content), auth => {
            const sheets = google.sheets({ version: 'v4', auth })

            let values = [[data.duration]]

            const resource = { values }
            const row = 21, col = getColLetters(moment(data.date).dayOfYear())

            sheets.spreadsheets.values.update({
                spreadsheetId: conf.sid,
                range: `${conf.page}!${col}${row}:${row}`,
                resource: resource,
                valueInputOption: 'USER_ENTERED'
            }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                console.log(chalk.bgGreen('\n Great work! \n'));
            });
        })
    })

}

function getColLetters(number){
    X = (n) => (a = Math.floor(n / 26)) >= 0 ? X(a - 1) + String.fromCharCode(65 + (n % 26)) : '';
    return X(number)
}

module.exports = post