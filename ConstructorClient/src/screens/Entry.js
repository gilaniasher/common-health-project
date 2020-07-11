import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, Dimensions, Image } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import auth from '@react-native-firebase/auth'
import { getDashboardInfo } from '../actions/UserInfo'
import logo from '../images/logo.png'

const { width, height } = Dimensions.get('window')

export default function Entry(props) {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()

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
            <Image source={logo} style={styles.logo}/>

            <View style={styles.separator} />

            <AwesomeButtonRick 
                type='anchor'
                onPress={() => props.navigation.navigate('Signup')}
                borderRadius={20}
                stretch={true}
            >
                Sign Up
            </AwesomeButtonRick>

            <View style={styles.separator} />

            <AwesomeButtonRick 
                type='anchor'
                onPress={() => props.navigation.navigate('Login')}
                borderRadius={20}
                stretch={true}
            >
                Login
            </AwesomeButtonRick>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10%'
    },
    separator: {
        height: 30
    },
    logo: {
        width: Math.min(width, height) / 1.5,
        height: Math.min(width, height) / 1.5
    }
});
