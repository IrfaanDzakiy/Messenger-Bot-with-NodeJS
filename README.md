# AGUS BOT

## Introduction

This is my attempt on building a Facebook Messenger Bot. The main technology used is [ExpressJS](https://www.npmjs.com/package/express) for the main server, [Bottender](https://bottender.js.org/en/) for bot interaction and webhooks setup, [MongoDB](https://bottender.js.org/en/) for persistent databases.

## What Can It Do?

This app consist of 2 main parts. The bot itself, and a REST API. Agus Bot can tell how many days until users birthday. Meanwhile with the REST API users can :  

1. Get list of messages that the bot receives
2. Get message by ID
3. Delete message by ID

## Configuration

### The `bottender.config.js` File

Bottender configuration file. You can use this file to provide settings for the session store and channels.

### The `.env` File

Bottender utilizes the [dotenv](https://www.npmjs.com/package/dotenv) package to load your environment variables when developing your app.

To make the bot work, you must put required environment variables into your `.env` file.

## How To Run

There are several ways you can do to try the app.

### 1. Try Live Bot

This bot is currently live on heroku server. If you want to try it directly, login to Facebook with this credentials

```sh
email : agusbottester@gmail.com
pass  : agusmantap
```

Then go to [this](https://web.facebook.com/AgusBot-103476515211790/) page.<br>
TRY IT!

This live version of the bot use MongoDB cluster to store message history and sessions. These are the endpoints for the API

1. Get All Messages

```sh
GET https://irfaan-agus-bot.herokuapp.com/api/messages
```

2. Get Messages By Id

```sh
GET https://irfaan-agus-bot.herokuapp.com/api/messages/:id
```

3. Delete Messages By Id

```sh
DELETE https://irfaan-agus-bot.herokuapp.com/api/messages/:id 
```

### 2. Run Locally

#### Prerequisites

1. [NodeJS](https://nodejs.org/en/)
2. [MongoDB](https://bottender.js.org/en/)
3. Your own Facebook Facebook Dev account, Facebook App, and Facebook Page. (For more information please refer to [this](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup/) page)

Configure your environment. (Refer to [this](https://bottender.js.org/docs/en/channel-messenger-setup) page).

### `npm install`

Install app dependencies.

### `npm run dev`

Runs the app in development mode.<br>
The bot will automatically reload if you make changes to the code.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000) and ngrok runs on [http://localhost:4040](http://localhost:4040).

### `npm start`

Runs the app in production mode.<br>
By default, server runs on [http://localhost:5000](http://localhost:5000).

### `npx ngrok http 5000`

Create secure URL to your localhost server.<br>
This URL will be used for the webhooks in your Facebook APP.

### `npx bottender messenger webhook set`

Set webhook and enable bot related Messenger subscriptions.

To access API, replace domain from endpoints above with `localhost:5000`