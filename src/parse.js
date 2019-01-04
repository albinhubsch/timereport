const config = require('./config')
const moment = require('moment')
const chalk = require('chalk')

const today_list = ['today', 'idag', 'Today', 'Idag']
const yt_list = ["yesterday", "igår", "Yesterday", "Igår"];

function parse(args){

    const conf = config.getConfig()

    const project = args[0]
    const projectIndex = conf.projects.find(search => search.title === project)

    if(!projectIndex){
        console.log(chalk.bgRed('\n Invalid project name \n'))
        process.exit(1)
    }

    const duration = parseFloat(args[1])
    let date = moment()

    if(args[1]){
        date = getDate(args[2])
    }

    return {
        date: date.format('YYYY-MM-DD'),
        duration: duration,
        projectIndex: projectIndex.index
    }

}

function getDate(arg){
    if (today_list.includes(arg)) {
        return moment()
    }

    if (yt_list.includes(arg)) {
        return moment().subtract(1, 'day')
    }

    return moment(arg)
}

module.exports = parse