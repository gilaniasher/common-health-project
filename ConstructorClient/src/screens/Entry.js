import React from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';

const { width, height } = Dimensions.get('window');

export default function Entry(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Icon name='shield-cross' size={Math.min(width, height) / 1.5} color='#003366' />

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
    }
});
