import { getDashboardInfo } from '../actions/UserInfo'

const endpoint = 'https://uagvmuj2b3.execute-api.us-east-2.amazonaws.com/Prod'

export const kitSignup = (uid, numKits, nextRound, changeState, changeDashboardState) => {
    console.log('Backend kit signup')

    if (!nextRound) {
        // For python backend, an empty string will be treated as false
        nextRound = ''
    }
    
    const url = `${endpoint}/KitSignup?` + new URLSearchParams({ uid, numKits, nextRound })

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
            changeState('successMsg', 'Waitlisted! Check back in later for assignment')
        })
        .catch((err) => {
            changeState('spinner', false)
            changeState('signupError', 'Failed to sign up for kits. Please try later.')
            console.log(`Failed to sign user up for kits: ${err}`)
        })
}
