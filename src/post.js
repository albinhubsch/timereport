const axios = require('axios')
const config = require('./config')

async function post(data){

    const url = config.getConfig().url
    // 
    console.log('WILL SEND TO SERVER', data)

    // const res = await axios.post(url, data)

}

module.exports = post