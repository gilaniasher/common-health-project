const endpoint = 'https://uagvmuj2b3.execute-api.us-east-2.amazonaws.com/Prod'

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
