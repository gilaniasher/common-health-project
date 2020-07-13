import { getDashboardInfo } from '../actions/UserInfo'

const endpoint = 'http://10.0.2.2:3000'

export const kitSignup = (uid, numKits, changeState, changeDashboardState) => {
    console.log('Backend kit signup')
    
    const url = `${endpoint}/KitSignup?` + new URLSearchParams({ uid, numKits })

    // Create user in our own custom RDS database
    fetch(url, { method: 'POST' })
        .then((res) => {
            if (res.status === 200) {
                getDashboardInfo(uid).then(data => changeDashboardState('data', data))
                console.log('Succesfully signed user up for kits: ')
            } else {
                changeState('signupError', 'Failed to sign up for kits. Please try later.')
                console.log('Failed to sign user up for kits: ')
            }

            return res.json()
        })
        .then((json) => {
            changeState('spinner', false)
            console.log(`${JSON.stringify(json)}`)
        })
        .catch((err) => {
            changeState('spinner', false)
            changeState('signupError', 'Failed to sign up for kits. Please try later.')
            console.log(`Failed to sign user up for kits: ${err}`)
        })
}
