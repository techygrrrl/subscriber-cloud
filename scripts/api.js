import { sleep } from "./utils";

const tauApiHost = import.meta.env.VITE_TAU_HOST
const tauToken = import.meta.env.VITE_TAU_TOKEN
const broadcasterId = import.meta.env.VITE_BROADCASTER_ID

export const makeGet = async (url) => {
  const response = await window.fetch(url, {
    headers: {
      Authorization: `Token ${tauToken}`
    }
  })
  if (!response.ok) {
    return Promise.reject()
  }

  return await response.json()
}

export const getSubscribers = async () => {
  let cursor = ''
  const subscribers = []
  let shouldFetch = true

  do {
    console.log(`Getting subscribers for cursor ${cursor} ...`)

    await sleep(2000)

    // Make request
    const response = await makeGet(`${tauApiHost}/api/twitch/helix/subscriptions?broadcaster_id=${broadcasterId}&after=${cursor}`)

    // Add the subscribers to the list
    response.data.forEach(subscriber => {
      subscribers.push(subscriber.user_name)
    })

    // Pagination things
    cursor = response.pagination?.cursor || ''
    if (!cursor) {
      shouldFetch = false
    }
  } while (shouldFetch)

  return subscribers
}