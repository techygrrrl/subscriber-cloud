import '../style.css'

import TagCloud from 'TagCloud'

import { getSubscribers } from "./api";

let tagCloud = null

// stelioss9909: WPM Gangsta


/**
 * @param values string[]
 */
const initTagCloud = () => {
  // Docs: https://www.npmjs.com/package/TagCloud
  const options = {
    radius: 200,
    maxSpeed: 'slow',
    initSpeed: 'slow',
    direction: 135, // degrees: right-bottom
    keep: true,
  }

  console.log('Initializing tag cloud...')

  tagCloud = TagCloud('#app', [], options)
}

initTagCloud()

let subscribers = []

const loadSubscriberTagCloud = () => {
  console.log('Load all subscribers into the cloud...')

  getSubscribers('').then((fetchedSubscribers) => {
    subscribers = fetchedSubscribers

    tagCloud?.update(subscribers)
  })
}


const tauWebSocketsHost = import.meta.env.VITE_TAU_WS_HOST
const tauToken = import.meta.env.VITE_TAU_TOKEN

const subscribeToSubscribers = () => {
  const webSocketClient = new WebSocket(tauWebSocketsHost)
  webSocketClient.addEventListener('open', () => {
    const auth = JSON.stringify({ token: tauToken })
    webSocketClient.send(auth)

    console.log('connected to websockets')
  })

  webSocketClient.addEventListener('message', (event) => {
    if (!tagCloud) return

    try {
      const parsedData = JSON.parse(event.data)
      if (parsedData.event_type === 'channel-subscribe') {
        const newSubscriber = parsedData?.event_data?.user_name

        subscribers.push(newSubscriber)

        tagCloud.update(subscribers)
      }
    } catch (e) {
      console.error('JSON parse error', e);
    }
  })
}

// Load all subscribers into the cloud
// loadSubscriberTagCloud()
subscribeToSubscribers()

