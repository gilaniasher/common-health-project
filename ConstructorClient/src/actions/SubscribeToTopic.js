const endpoint = 'http://10.0.2.2:3000'

export const subscribeToTopic = (regToken, county) => {
    console.log('Subscribing to notification topic')
    const url = `${endpoint}/SubscribeToCountyNotifs?` + new URLSearchParams({ regToken, county })

    return fetch(url, { method: 'POST' })
        .then((res) => {
            if (res.status === 200) {
                console.log('Succesfully subscribed')
            } else {
                console.log('Failed to subscribe')
            }
        })
        .catch((err) => {
            console.log(`Failed to subscribe: ${err}`)
        })
}
