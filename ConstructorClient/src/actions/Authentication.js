import auth from '@react-native-firebase/auth'
const endpoint = 'http://10.0.2.2:3000'

const customSignup = (userInfo, uid, navigation) => {
    const url = `${endpoint}/Signup?` + new URLSearchParams({
        uid: uid,
        name: userInfo.name,
        address: userInfo.address,
        county: userInfo.county,
        phone_number: userInfo.phone,
        email: userInfo.email
    })

    // Create user in our own custom RDS database
    fetch(url, { method: 'POST' })
        .then(() => {
            console.log('User created in custom backend')
            navigation.navigate('TabNavigator')
        })
        .catch(err => {
            console.log(`Could not make user in custom backend: ${err}`)
        })
}

export const signup = (userInfo, navigation) => {
    // Set auth listener for when user is signed in
    auth().onAuthStateChanged(user => {
        console.log('Attempting to add user to custom backend')

        if (user)
            customSignup(userInfo, user.uid, navigation)
    })

    // Create Firebase User (Requires email, password)
    auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(() => console.log('Firebase account created'))
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
