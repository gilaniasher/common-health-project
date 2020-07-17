const endpoint = 'http://10.0.2.2:3000'

export const submitKits = (uid, numShieldsBuilt, changeState, navigation) => {
    console.log('Submitting Shields')
    const url = `${endpoint}/SubmitShields?` + new URLSearchParams({ uid, numShieldsBuilt })

    return fetch(url, { method: 'POST' })
        .then((res) => {
            if (res.status === 200) {
                console.log('Succesfully built shields: ')
            } else {
                changeState('submitShieldsError', 'Failed to submit shields. Please try later.')
                console.log('Failed to submit shields: ')
            }

            return res.json()
        })
        .then((json) => {
            changeState('spinner', false)
            console.log(`${JSON.stringify(json)}`)
            navigation.navigate('Success')
        })
        .catch((err) => {
            changeState('spinner', false)
            changeState('submitShieldsError', 'Failed to submit shields. Please try later.')
            console.log(`Failed to submit shields: ${err}`)
        })
}
