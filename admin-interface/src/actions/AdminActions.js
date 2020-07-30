const endpoint = 'http://127.0.0.1:3002'

export const login = (username, password, setLoggedIn, setLoading) => {
    const url = `${endpoint}/AdminLogin?` + new URLSearchParams({ username, password })

    fetch(url, { method: 'POST' })
        .then((res) => {
            if (res.status === 200) {
                console.log('Logging in')
                setLoggedIn(true)
                setLoading(false)
            } else {
                console.log('Failed to log in')
                setLoggedIn(false)
                setLoading(false)
            }
        })
        .catch(() => {
            console.log('Log in request failed')
            setLoggedIn(false)
            setLoading(false)
        })
}

export const scheduleRounds = ({ roundNum, startDate, endDate }) => {
    const url = `${endpoint}/AddRound?` + new URLSearchParams({
        roundNum,
        startDate,
        endDate
    })

    fetch(url, { method: 'POST' })
        .then(() => console.log('Round added'))
        .catch(err => console.log(`Could not add new round: ${err}`))
}

export const scheduleKitDates = ({ roundNum, county, kitDropoffDate, kitPickupDate }) => {
    const url = `${endpoint}/ScheduleDates?` + new URLSearchParams({
        roundNum,
        county,
        kitDropoffDate,
        kitPickupDate
    })

    fetch(url, { method: 'POST' })
        .then(() => console.log('Scheduled Dates'))
        .catch(err => console.log(`Could not schedule dates: ${err}`))
}

export const assignKits = () => {

}
