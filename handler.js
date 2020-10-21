'use strict';
require('dotenv').config();

const { getDadJoke } = require('./helpers/jokes');
const { postJokeToDiscord } = require('./helpers/discord');

module.exports.joke = (event, context, callback) => {
  console.log('[HANDLER] START');
  getDadJoke()
    .then(res => {
      if (res.status !== 200) {
        return callback(null, {
          statusCode: res.status,
          body: JSON.stringify(
            { error: 'Could not fetch a joke' }
          )
        });
      }
      // Get the joke text
      const { joke } = res;
      console.log(`[HANDLER] JOKE RECEIVED: ${joke}`);

      postJokeToDiscord(joke)
        .then(res => {
          if (res.status !== 200) {
            return callback(null, {
              statusCode: res.status,
              body: JSON.stringify(
                { error: 'Could not post to discord server' }
              )
            });
          }

          else {
            return callback(null, {
              statusCode: 200,
              body: JSON.stringify(
                {
                  message: 'posted to discord successfully!'
                }
              )
            });
          }

        })
        .catch((error) => {
          return callback(null, {
            statusCode: 500,
            body: JSON.stringify(
              { error }
            )
          });
        });

    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(
          { error }
        )
      }
    });
};
