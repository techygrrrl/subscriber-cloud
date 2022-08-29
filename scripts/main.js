import '../style.css'

import TagCloud from 'TagCloud'
import { getSubscribers } from "./api";
import { tauToken, tauWebSocketsHost } from "./environment";
import shuffle from 'lodash/shuffle'

// stelioss9909: WPM Gangsta


/**
 * Global tag cloud object.
 *
 * Usage:
 *    .update(tagsList)
 */
let tagCloud = null


/**
 * Global subscribers list
 * @type {string[]}
 */
let subscribers = []


/**
 * Initializes the Tag Cloud in the DOM.
 * At this stage, it's an empty tag cloud.
 */
const initTagCloud = () => {
  // Docs: https://www.npmjs.com/package/TagCloud
  const options = {
    radius: 230,
    maxSpeed: 'fast',
    initSpeed: 'fast',
    direction: 85, // degrees: right-bottom = 135, horizontal = 90
    keep: true,
  }

  console.log('☁️️ Initializing tag cloud...')

  tagCloud = TagCloud('#app', [], options)
}

/**
 * Fetches paginated subscribers, staggered by 2 seconds per request.
 * Adds all subscribers to the global subscribers array.
 * Updates the tag cloud with all the subscribers.
 */
const fetchAllSubscribersAndLoadThemIntoTheTagCloud = () => {
  console.log('☁️ Load all subscribers into the cloud...')

  getSubscribers('').then((fetchedSubscribers) => {
    subscribers = shuffle(fetchedSubscribers)

    tagCloud?.update(subscribers)
  })
}


/**
 * Listens to subscribe events in real time.
 */
const subscribeToSubscribers = () => {
  const webSocketClient = new WebSocket(tauWebSocketsHost)
  webSocketClient.addEventListener('open', () => {
    const auth = JSON.stringify({ token: tauToken })
    webSocketClient.send(auth)

    console.log('☁️ connected to websockets')
  })

  // Intrus18: AFFILIATE ANNIVERSARY! GO TECHY GO!!!
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
      console.error('⛈ JSON parse error', e);
    }
  })
}


/**
 * 🚀 Run all the things!!!
 */

initTagCloud()
fetchAllSubscribersAndLoadThemIntoTheTagCloud()
subscribeToSubscribers()

