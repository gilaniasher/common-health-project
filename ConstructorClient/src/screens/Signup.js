import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';
import auth from '@react-native-firebase/auth';

export default function Signup() {
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    const signup = () => {
        let valid = true

        Object.entries(state).forEach(([key, value]) => {
            if (value === '') {
                valid = false
                console.log(`${key} is not defined`)
            }
        })

        if (valid) {
            auth()
                .createUserWithEmailAndPassword(state.email, state.password)
                .then(() => {
                    console.log('User account created & signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });

            console.log(state.firstname)
            console.log(state.lastname)
            console.log(state.email)
            console.log(state.password)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Sign Up</Text>

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
                onPress={signup}
                borderRadius={20}
                stretch={true}
            >
                Sign Up
            </AwesomeButtonRick>
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
        height: '10%'
    }
});
