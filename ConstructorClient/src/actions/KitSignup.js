const endpoint = 'http://10.0.2.2:3000'

export const kitSignup = (uid, numKits) => {
    console.log('Backend kit signup')
    
    const url = `${endpoint}/KitSignup?` + new URLSearchParams({ uid, numKits })

    // Create user in our own custom RDS database
    fetch(url, { method: 'POST' })
        .then(res => {
            if (res.status === 200) {
                console.log('Succesfully signed user up for kits: ')
            } else {
                console.log('Failed to sign user up for kits: ')
            }

            return res.json()
        })
        .then((json) => {
            console.log(`${JSON.stringify(json)}`)
        })
        .catch(err => {
            console.log(`Failed to sign user up for kits: ${err}`)
        })
}
