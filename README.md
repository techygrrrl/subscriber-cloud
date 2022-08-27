# Subscriber Tag Cloud

- [Dependencies](#dependencies)
- [Setup](#setup)
- [Development](#development)
- [Distribution](#distribution)


This is an animated word cloud that fetches subscribers from Twitch, loads them all in the cloud, and listens for updates over web sockets.


## Dependencies

- [TAU - Twitch API Unifier](https://github.com/Team-TAU/tau)


## Setup

You will need to set up the environment variables.

    cp .env.example .env.local

Fill out the environment variables.

If you are running your TAU instance on port 8000 (the default configuration), it will look something like this:

```yml
VITE_TAU_HOST=http://localhost:8000
VITE_TAU_WS_HOST=ws://127.0.0.1:8000/ws/twitch-events/
VITE_TAU_TOKEN=
VITE_BROADCASTER_ID=
```

The provided broadcaster ID must be the same as the owner of the TAU user.


## Development

You can run the development server:

    npm install
    npm run dev


## Distribution

You can bundle this with Vite and serve the static assets from anywhere:

    npm run build

Assets are built to the `./dist` folder.