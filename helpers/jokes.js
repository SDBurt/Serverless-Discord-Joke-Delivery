require('dotenv').config();

const axios = require('axios');

const options = {
    headers: {
        Accept: 'application/json',
        'User-Agent': 'My Library (https://github.com/SDBurt/Serverless-Discord-Joke-Delivery)',
    },
};

const getDadJoke = () => new Promise((resolve, reject) => {
    console.log('[JOKES] START');
    axios.get(process.env.JOKES_API_URL, options)
        .then(response => {
            console.log('[JOKES] GET REQUEST SUCCESS');
            resolve(response.data)
        })
        .catch(error => {
            console.error('[JOKES] GET REQUEST FAIL');
            console.log(error)
            reject(error)
        })
});

module.exports = {
    getDadJoke,
};