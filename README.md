# Subscriber Tag Cloud

- [Dependencies](#dependencies)
- [Setup](#setup)
- [Development](#development)
- [Distribution](#distribution)


This is an animated word cloud that fetches subscribers from Twitch, loads them all in the cloud, and listens for updates over web sockets.


## Dependencies

- [Abstractrrr](https://github.com/techygrrrl/abstractrrr)


## Setup

You will need to pass the following query params in the URL:

- `token`: Abstractrrr API token
- `broadcaster_id`: your user ID

This will make a request against your locally-running Abstractrrr on port 9999.

The provided broadcaster ID must be an authorized user of Abstractrrr.

For example, your URL should look like this: https://techygrrrl-subscriber-cloud.pages.dev/?token=<token>&broadcaster_id=<id>


## Development

You can run the development server:

    npm install
    npm run dev


## Distribution

You can bundle this with Vite and serve the static assets from anywhere:

    npm run build

Assets are built to the `./dist` folder.
