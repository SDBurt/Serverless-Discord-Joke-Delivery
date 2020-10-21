# Serverless-Discord-Joke-Delivery

A serverless scheduled job which gets a joke from https://icanhazdadjoke.com/api and posts in a discord using the discord webhook.

The job is scheduled for 8:30 AM every morning.

Aspects of this project were taken from the serverless github example repository https://github.com/serverless/examples/tree/master/aws-node-twitter-joke-bot


## Setup

- Install `serverless` from npm and initialize

- Create a `.env.json` file in the root directory and add variables

```json
{
    "JOKES_API_URL": "https://icanhazdadjoke.com/",
    "DISCORD_WEBHOOK_URL": "https://discordapp.com/api/webhooks/<WEBHOOK URL>/<WEBHOOK TOKEN>"
}
```

- Update `serverless.yml`

```yml
org: <YOUR ORG>
app: <YOUR APP>
service: <YOUR SERVICE>
```

```yml
provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region: <YOUR REGION>
```

```yml
functions:
  joke:
    handler: handler.joke
    description: <DESCRIPTION OF FUNCTION>
    events:
      - schedule: <SCHEDULE, EX: 'cron(30 8 * * ? *)'>
    environment:
      JOKES_API_URL: ${self:custom.env.JOKES_API_URL}
      DISCORD_WEBHOOK_URL: ${self:custom.env.DISCORD_WEBHOOK_URL}
```

- Run `npm install` to install `axios` and other packages

- Run `serverless deploy`