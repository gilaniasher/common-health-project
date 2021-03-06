import auth from '@react-native-firebase/auth'
import { getDashboardInfo } from '../actions/UserInfo'

const endpoint = 'https://uagvmuj2b3.execute-api.us-east-2.amazonaws.com/Prod'

const customSignup = (userInfo, uid, navigation, changeState) => {
    const url = `${endpoint}/Signup?` + new URLSearchParams({
        uid,
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

            getDashboardInfo(uid).then((data) => {
                changeState('spinner', false)
                navigation.navigate('TabNavigator', { uid, ...data })
            })
        })
        .catch(err => {
            console.log(`Could not make user in custom backend: ${err}`)
        })
}

export const signup = (userInfo, navigation, changeState) => {
    changeState('spinner', true)

    // Create Firebase User (Requires email, password)
    auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((data) => {
            console.log('Firebase account created')
            console.log('Attempting to add user to custom backend')

            if (data.user)
                customSignup(userInfo, data.user.uid, navigation, changeState)
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
