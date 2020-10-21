require('dotenv').config();

const axios = require('axios');


const postJokeToDiscord = (joke) => new Promise((resolve, reject) => {
    console.log('[DISCORD] START');
    axios.post(process.env.DISCORD_WEBHOOK_URL + '?wait=true', {
        'content': joke
    })
        .then(response => {
            console.log('[DISCORD] POST REQUEST SUCCESS');
            resolve(response)
        })
        .catch(error => {
            console.error('[DISCORD] POST REQUEST FAIL');

            reject(error)
        })
});

module.exports = {
    postJokeToDiscord,
};