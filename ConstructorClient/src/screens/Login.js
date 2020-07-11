import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import auth from '@react-native-firebase/auth'
import { getDashboardInfo } from '../actions/UserInfo'

export default function Login(props) {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    const login = () => {
        let valid = true

        Object.entries(state).forEach(([key, value]) => {
            if (value === '') {
                valid = false
                console.log(`${key} is not defined`)
            }
        })

        if (valid) {
            auth()
                .signInWithEmailAndPassword(state.email, state.password)
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        console.log('Invalid email')
                    } else if (error.code === 'auth/user-disabled') {
                        console.log('User disabled')
                    } else if (error.code === 'auth/user-not-found') {
                        console.log('User not found')
                    } else if (error.code === 'auth/wrong-password') {
                        console.log('Wrong password')
                    }
                })
        }
    }
  
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            setUser(user)
            if (initializing) setInitializing(false)
        })

        return subscriber
    }, [])

    useEffect(() => {
        if (user) {
            getDashboardInfo(user.uid).then((data) => {
                props.navigation.navigate('TabNavigator', {
                    screen: 'Dashboard',
                    params: { 
                        screen: 'Dashboard',
                        params: { uid: user.uid, userInfo: data }
                    }
                })
            })
        }
    }, [user])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Login</Text>

            <TextField 
                label='Email'
                textColor='#003366'
                tintColor='#003366'
                baseColor='#003366'
                onChangeText={(msg) => changeState('email', msg)}
            />
            <TextField 
                label='Password'
                textColor='#003366'
                tintColor='#003366'
                baseColor='#003366'
                onChangeText={(msg) => changeState('password', msg)}
                secureTextEntry={true}
            />

            <View style={styles.separator} />

            <AwesomeButtonRick 
                type='anchor'
                onPress={login}
                borderRadius={20}
                stretch={true}
            >
                Login
            </AwesomeButtonRick>

            {initializing &&
                <ActivityIndicator size='large' color='#003366' />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: '10%',
        flex: 1,
        justifyContent: 'center'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        paddingBottom: '10%'
    },
    separator: {
        height: '20%'
    }
});
