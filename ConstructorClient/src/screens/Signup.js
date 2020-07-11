import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import { signup } from '../actions/Authentication'
import Spinner from 'react-native-loading-spinner-overlay';

export default function Signup(props) {
    const [signupDisabled, setSignupDisabled] = useState(true)
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        address: '',
        county: '',
        phone: '',
        spinner: false
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    const initSignup = () => {
        signup({
            name: `${state.firstname} ${state.lastname}`,
            email: state.email,
            address: state.address,
            county: state.county,
            phone: state.phone,
            password: state.password
        }, props.navigation, changeState)
    }

    useEffect(() => {
        let valid = true

        Object.entries(state).forEach(([key, value]) => {
            if (value === '')
                valid = false
        })

        if (valid) {
            setSignupDisabled(false)
        }

        else {
            setSignupDisabled(true)
        }
    }, [state])

    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={state.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Text style={styles.headerText}>Sign Up</Text>

            <ScrollView>
                <TextField
                    label='First Name'
                    textColor='#003366'
                    tintColor='#003366'
                    baseColor='#003366'
                    onChangeText={(msg) => changeState('firstname', msg)}
                />
                <TextField
                    label='Last Name'
                    textColor='#003366'
                    tintColor='#003366'
                    baseColor='#003366'
                    onChangeText={(msg) => changeState('lastname', msg)}
                />
                <TextField
                    label='Address'
                    textColor='#003366'
                    tintColor='#003366'
                    baseColor='#003366'
                    onChangeText={(msg) => changeState('address', msg)}
                />
                <TextField
                    label='County'
                    textColor='#003366'
                    tintColor='#003366'
                    baseColor='#003366'
                    onChangeText={(msg) => changeState('county', msg)}
                />
                <TextField
                    label='Phone Number'
                    textColor='#003366'
                    tintColor='#003366'
                    baseColor='#003366'
                    onChangeText={(msg) => changeState('phone', msg)}
                />
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
            </ScrollView>

            <View style={styles.separator} />

            <AwesomeButtonRick
                type='anchor'
                onPress={initSignup}
                borderRadius={20}
                stretch={true}
                disabled={signupDisabled}
            >
                Sign Up
            </AwesomeButtonRick>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
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
        height: '10%'
    }
});
