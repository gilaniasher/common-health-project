import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TutorialVideo(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.welcome}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
                    <Icon name='ios-arrow-back' size={28} color='white' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Video Tutorial</Text>
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.text}>Link to video: </Text>
                <Text 
                    onPress={() => Linking.openURL('https://www.youtube.com/watch?v=Pyt_wHThplo')}
                    style={styles.link}
                >
                    Video Instructions
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    welcome: {
        flex: 1,
        backgroundColor: '#003366',
        padding: 20,
        paddingBottom: 0,
        flexDirection: 'row'
    },
    backButton: {
        paddingTop: '1%',
        paddingRight: '5%'
    },
    headerText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    bottomContainer: {
        flex: 9.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40
    },
    link: {
        fontSize: 30,
        color: 'blue'
    }
});
