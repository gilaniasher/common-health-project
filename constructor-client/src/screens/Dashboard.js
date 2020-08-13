import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import { UserContext } from '../components/UserContext'
import OptModal from '../components/OptModal'
import messaging from '@react-native-firebase/messaging'
import DropDownHolder from '../components/DropDownHolder'
import { NotificationArea } from './Notifications'
import { subscribeToTopic } from '../actions/SubscribeToTopic'

export default function Dashboard(props) {
    const userContext = useContext(UserContext)
    const [modalError, setModalError] = useState('')
    const [state, setState] = useState({
        uid: -1,
        name: '',
        roundNumber: 0,
        assignedShields: 0,
        builtShields: 0,
        brokenShields: 0,
        optedOut: true,
        waitlisted: false,
        county: '',
        notifications: []
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    const initTopicSubscription = async () => {
        const fcmToken = await messaging().getToken()
        console.log('fcm token: ', fcmToken)
        subscribeToTopic(fcmToken, state.county)
    }

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission()
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL

        if (enabled) {
            console.log('Authorization status:', authStatus)
        }
    }

    useEffect(() => {
        console.log('UserContext', JSON.stringify(userContext, null, 2))
        changeState('uid', userContext.uid)
        changeState('name', userContext.name)
        changeState('roundNumber', userContext.currentRound)
        changeState('optedOut', userContext.optedOut)
        changeState('waitlisted', userContext.waitlisted)
        changeState('notifications', userContext.notifications)
        changeState('county', userContext.county)

        if (userContext.currentRound === -1) {
            console.log('No round in progress')
            setModalError('No round in progress right now.\n\nIf this is a mistake, an admin will be addressing it soon.')
        } else if (userContext.optedOut && userContext.waitlisted) {
            console.log('User is waitlisted for shields in current round')
            setModalError(`You have been waitlisted for ${userContext.numMasksAssigned} shields.\n\nPlease wait for an admin to assign you kits.`)
        } else {
            console.log('User is constructing this round')
            changeState('assignedShields', userContext.numMasksAssigned)
            changeState('builtShields', userContext.numMasksBuilt)
            changeState('brokenShields', userContext.numMasksBroken)
        }

        requestUserPermission()

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('FCM Notification: ', JSON.stringify(remoteMessage))
            DropDownHolder.dropDown.alertWithType('info', remoteMessage.notification.title, remoteMessage.notification.body)
        })

        return unsubscribe
    }, [])

    useEffect(() => {
        if (state.county !== '')
            initTopicSubscription()
    }, [state.county])

    return (
        <>
            <OptModal
                visible={state.optedOut}
                uid={state.uid}
                changeDashboardState={changeState} 
                navigation={props.navigation}
                error={modalError}
                currRound={state.roundNumber}
            />
            <SafeAreaView style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.bannerHeaderText}>Welcome {state.name}</Text>
                </View>

                <View style={{ flex: 9.5 }}>
                    <View style={styles.progressContainer}>
                        <Text style={styles.headerText}>Shields Assigned This Round</Text>

                        <View style={styles.profileStatsContainer}>
                            <View style={styles.profileStats}>
                                <Text style={styles.statsNumber}>{state.assignedShields / 10}</Text>
                                <Text style={styles.statsText}>Kits</Text>
                            </View>

                            <View style={styles.verticalSeparator} />

                            <View style={styles.profileStats}>
                                <Text style={styles.statsNumber}>{state.assignedShields}</Text>
                                <Text style={styles.statsText}>Shields</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <AwesomeButtonRick 
                            type='anchor'
                            onPress={() => props.navigation.navigate('Construction')}
                            borderRadius={15}
                            stretch={true}
                            backgroundColor={'#003366'}
                            backgroundDarker={'#003366'}
                        >
                            Construct Shields
                        </AwesomeButtonRick>

                        <View style={styles.verticalSpacer} />

                        <TouchableOpacity style={styles.notificationsHeader} onPress={() => props.navigation.navigate('Notifications', { data: state.notifications })}>
                            <Text style={[styles.normalText, {flex: 1}]}>Most Recent Notifications</Text>
                            <Text style={[styles.normalText, {justifyContent: 'flex-end'}]}>{'>'}</Text>
                        </TouchableOpacity>

                        <View />

                        <View style={styles.notifications}>
                            <NotificationArea data={state.notifications} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(46, 49, 49, .98)',
        paddingHorizontal: '5%'
    },
    modalHeader: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: '20%',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
    },
    welcomeContainer: {
        flex: 1,
        backgroundColor: '#003366',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 0,
        elevation: 10
    },
    bannerHeaderText: {
        width: '100%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'left'
    },
    headerText: {
        width: '100%',
        color: 'black',
        fontSize: 20,
        textAlign: 'left',
        paddingVertical: '5%',
        paddingLeft: '5%'
    },
    progressContainer: {
        flex: 2,
        paddingBottom: 30
    },
    profileStats: {
        flexDirection: 'column',
        paddingBottom: 20
    },
    profileStatsContainer: {
        flexDirection: 'row'
    },
    verticalSeparator: {
        height: '60%',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'black',
        opacity: 0.5,
    },
    statsNumber: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: '20%',
        fontSize: 35
    },
    statsText: {
        textAlign: 'center',
        paddingHorizontal: '20%',
        fontSize: 15,
    },
    timelineContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: 'black',
        borderBottomColor: 'black',
        paddingVertical: 7
    },
    timelineLeft: {
        flex: 1,
        color: 'black',
        fontSize: 20,
        paddingLeft: 20
    },
    timelineRight: {
        justifyContent: 'flex-end',
        color: 'black',
        fontSize: 20,
        paddingRight: 20
    },
    bottomContainer: {
        flex: 6,
        paddingHorizontal: 15,
        paddingTop: '5%',

    },
    normalText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 20
    },
    verticalSpacer: {
        height: '8%'
    }, 
    notificationsHeader: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%'
    },
    notifications: {
        height: '100%',
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'rgba(128, 128, 128, 0.5)',
        padding: 20
    }
})
