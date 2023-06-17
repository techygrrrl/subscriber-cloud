import { sleep } from "./utils";

export function tokenFromURL() {
  const params = new URLSearchParams(location.search);
  return params.get("token");
}

export function broadcasterIdFromURL() {
  const params = new URLSearchParams(location.search);
  return params.get("broadcaster_id");
}

/**
 * Makes a TAU network request with fetch
 * @param url
 * @returns {Promise<any>}
 */
const makeGet = async (url) => {
  const response = await window.fetch(url, {
    headers: {
      Authorization: `Bearer ${tokenFromURL()}`,
      'X-User-ID': broadcasterIdFromURL(),
    },
    referrerPolicy: 'no-referrer',
  })
  if (!response.ok) {
    return Promise.reject()
  }

  return await response.json()
}


/**
 * Fetches all subscribers from Twitch via TAU.
 * Staggers requests to 1 every 1.5 seconds.
 * @returns {Promise<string[]>}
 */
export const getSubscribers = async () => {
  let cursor = ''
  const subscribers = []
  let shouldFetch = true

  do {
    console.log(`☁️ Getting subscribers for cursor ${cursor} ...`)

    await sleep(1500)

    // Make request
    const response = await makeGet(`http://127.0.0.1:9999/v1/api/helix/subscriptions?broadcaster_id=${broadcasterIdFromURL()}&after=${cursor}`)

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
