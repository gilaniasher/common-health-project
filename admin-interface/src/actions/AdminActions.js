const endpoint = 'http://127.0.0.1:3002'

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
