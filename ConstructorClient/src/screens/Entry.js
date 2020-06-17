import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';

const { width, height } = Dimensions.get('window');

export default function Entry() {
    return (
        <View style={styles.container}>
            <Icon name='shield-cross' size={Math.min(width, height) / 1.5} color='#003366' />

            <View style={styles.separator} />

            <AwesomeButtonRick 
                type='anchor'
                onPress={() => console.log('Sign Up')}
                borderRadius={20}
                stretch={true}
            >
                Sign Up
            </AwesomeButtonRick>

            <View style={styles.separator} />

            <AwesomeButtonRick 
                type='anchor'
                onPress={() => console.log('Login')}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10%'
    },
    separator: {
        height: 30
    }
});
