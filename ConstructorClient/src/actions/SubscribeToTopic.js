const endpoint = 'https://otat5bn84l.execute-api.us-east-2.amazonaws.com/Prod'

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
