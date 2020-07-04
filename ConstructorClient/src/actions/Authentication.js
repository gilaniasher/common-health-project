import auth from '@react-native-firebase/auth'
const endpoint = 'http://127.0.0.1:3000'

const customSignup = async (userInfo, token) => {
    // Create user in our own custom RDS database
    const res = await fetch(
        `${endpoint}/Signup?
            name=${userInfo.name}&
            address=${userInfo.address}&
            county=${userInfo.county}&
            phone_number=${userInfo.phone}&
            email=${userInfo.email}&
            token=${token}
        `,
        { method: 'POST' }
    )

    return (res.status === 200) ? 200 : 500
}

export const signup = (userInfo) => {
    console.log(JSON.stringify(userInfo, null, 2))

    // Create Firebase User (Requires email, password)
    auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(() => {
            console.log('Firebase account created')

            // Get JWT token for new user
            auth().currentUser.getIdToken()
                .then(idToken => customSignup(userInfo, idToken))
                .catch(error => console.log(`Not adding user to custom DB. Could not get JWT token: ${error}`))
        })
        .catch(error => {
            console.log('Unable to make Firebase account')

            if (error.code === 'auth/email-already-in-use')
                console.log('That email address is already in use!')
            else if (error.code === 'auth/invalid-email')
                console.log('That email address is invalid!')
            else
                console.error(error);
        })
}
