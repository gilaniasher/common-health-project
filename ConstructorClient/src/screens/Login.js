import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Login</Text>

            <TextField 
                label='Email'
                textColor='#003366'
                tintColor='#003366'
                baseColor='#003366'
                onChangeText={setEmail}
            />
            <TextField 
                label='Password'
                textColor='#003366'
                tintColor='#003366'
                baseColor='#003366'
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <View style={styles.separator} />

            <AwesomeButtonRick 
                type='anchor'
                onPress={() => console.log(password)}
                borderRadius={20}
                stretch={true}
            >
                Login
            </AwesomeButtonRick>
        </View>
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
