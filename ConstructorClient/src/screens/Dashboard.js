import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import { UserContext } from '../components/UserContext'
import NotificationBubble from '../components/NotificationBubble'
import logo from '../images/logo.png'
import OptModal from '../components/OptModal'

export default function Dashboard(props) {
    const userContext = useContext(UserContext)
    const [state, setState] = useState({
        uid: -1,
        name: '',
        roundNumber: 0,
        assignedShields: 0,
        builtShields: 0,
        brokenShields: 0,
        optedOut: true,
        notifications: []        
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    useEffect(() => {
        console.log('User Info Context: ', JSON.stringify(userContext, null, 2))
        changeState('uid', userContext.uid)
        changeState('name', userContext.name)
        changeState('roundNumber', userContext.currentRound)
        changeState('optedOut', userContext.optedOut)
        changeState('assignedShields', userContext.numMasksAssigned)
        changeState('builtShields', userContext.numMasksBuilt)
        changeState('brokenShields', userContext.numMasksBroken)
        changeState('notifications', userContext.notifications)
    }, [])

    const renderNotification = ({ item }) => {
        return (
            <NotificationBubble
                text={item.text}
                profImage={logo}
            />
        )
    }

    return (
        <>
            <OptModal
                visible={state.optedOut}
                uid={state.uid}
                changeDashboardState={changeState} 
                navigation={props.navigation}
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

                        <TouchableOpacity 
                            style={styles.timelineContainer} 
                            onPress={() => props.navigation.navigate('Timeline')}
                        >
                            <Text style={styles.timelineLeft}>Timeline Status</Text>
                            <Text style={styles.timelineRight}>{'>'}</Text>
                        </TouchableOpacity>
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

                        <TouchableOpacity style={styles.notificationsHeader} onPress={() => props.navigation.navigate('Notifications')}>
                            <Text style={[styles.normalText, {flex: 1}]}>Most Recent Notifications</Text>
                            <Text style={[styles.normalText, {justifyContent: 'flex-end'}]}>{'>'}</Text>
                        </TouchableOpacity>

                        <View />

                        <FlatList 
                            data={state.notifications}
                            renderItem={renderNotification}
                            keyExtractor={(item) => item.id}
                            style={styles.notifications}
                        />
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
        flex: 3.5,
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
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'rgba(128, 128, 128, 0.5)',
        padding: 20,
        paddingBottom: 0
    }
})
