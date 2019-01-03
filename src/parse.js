const moment = require('moment')

const today_list = ['today', 'idag', 'Today', 'Idag']
const yt_list = ["yesterday", "igår", "Yesterday", "Igår"];

function parse(args){

    const duration = parseFloat(args[0])
    let date = moment()

    if(args[1]){
        date = getDate(args[1])
    }

    return {
        date: date.format('YYYY-MM-DD'),
        duration: duration
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