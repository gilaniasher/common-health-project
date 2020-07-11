const endpoint = 'http://10.0.2.2:3000'

export const getDashboardInfo = (uid) => {
    console.log('Getting user dashboard info')
    const url = `${endpoint}/UserInfo?` + new URLSearchParams({ uid })

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(err => console.log(err))
}
