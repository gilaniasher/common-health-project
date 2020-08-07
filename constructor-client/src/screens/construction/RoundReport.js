import React, { useState, useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import Icon from 'react-native-vector-icons/Ionicons'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import Spinner from 'react-native-loading-spinner-overlay'
import { submitKits } from '../../actions/KitSubmission'
import { UserContext } from '../../components/UserContext'

export default function RoundReport(props) {
    const userContext = useContext(UserContext)
    const uid = userContext.uid
    const assignedShields = userContext.numMasksAssigned

    const [state, setState] = useState({
        spinner: false,
        submitShieldsError: ''
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    const submitBtn = () => {
        changeState('spinner', true)
        submitKits(uid, assignedShields, changeState, props.navigation)
    }
        
    return (
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={state.spinner}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={styles.welcome}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
                    <Icon name='ios-arrow-back' size={28} color='white' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Round Report</Text>
            </View>

            <View style={styles.bottomContainer}>
                <WebView 
                    source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLSdGeZ-usyxCw7wm2wAp8j3-eyElv1pm5apYlo9cAyAxRsVqMg/viewform' }}
                />

                <AwesomeButtonRick 
                    type='anchor'
                    borderRadius={0}
                    stretch={true}
                    style={styles.submitButton}
                    onPress={submitBtn}
                >
                    Done with the form? Submit here!
                </AwesomeButtonRick> 
            </View>
        </SafeAreaView>
    )
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
    },
    submitOpacity: {
        flex: 0.8,
        justifyContent: 'center',
        backgroundColor: '#003366',
        borderRadius: 10,
        marginBottom: '1%',
        marginHorizontal: '3%'

    },
    submitText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    }
})
