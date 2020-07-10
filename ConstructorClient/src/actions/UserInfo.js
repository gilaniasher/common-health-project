const endpoint = 'http://10.0.2.2:3000'

export const getDashboardInfo = (uid, changeState) => {
    console.log('Getting user dashboard info')
    const url = `${endpoint}/UserInfo?` + new URLSearchParams({ uid })

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            changeState('name', data.name)
            changeState('roundNumber', data.current_round)
            changeState('assignedShields', data.num_masks_assigned)
            changeState('builtShields', data.num_masks_assigned)
            changeState('brokenShields', data.num_masks_assigned)
            changeState('optedOut', false)
            changeState('notifications', data.notifications)
        })
        .catch(err => console.log(err))
}
