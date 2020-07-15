import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import auth from '@react-native-firebase/auth'
import { UserContext } from '../components/UserContext'

export default function Profile(props) {
    const userContext = useContext(UserContext)
    const [state, setState] = useState({
        uid: -1,
        name: '',
        roundNumber: 0,
        assignedShields: 0,
        builtShields: 0,
        brokenShields: 0,
        totalMasksBuilt: 0,
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
        changeState('totalMasksBuilt', userContext.totalMasksBuilt)
    }, [])

    const signout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out')
                props.navigation.navigate('Login')
            })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>{state.name}</Text>
            </View>
            <View style={styles.mainContainer}>
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

                <View style={styles.progressContainer}>
                    <Text style={styles.headerText}>Total Shield Records</Text>
                    <View style={styles.profileStatsContainer}>
                        <View style={styles.profileStats}>
                            <Text style={styles.statsNumber}>{state.totalMasksBuilt / 10}</Text>
                            <Text style={styles.statsText}>Kits</Text>
                        </View>

                        <View style={styles.verticalSeparator} />

                        <View style={styles.profileStats}>
                            <Text style={styles.statsNumber}>{state.totalMasksBuilt}</Text>
                            <Text style={styles.statsText}>Shields</Text>
                        </View>
                    </View>
                </View>

                <View style={{flex: 1, marginTop: '15%'}}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => Linking.openURL('mailto:gilaniasher@gmail.com')}>
						<Text style={{ color: '#666666', fontSize: 24 }}>
							Problems? Email Us!
            			</Text>
					</TouchableOpacity>
                </View>

                <AwesomeButtonRick
                    type='anchor'
                    onPress={signout}
                    borderRadius={20}
                    stretch={true}
                    backgroundColor={'#003366'}
                    backgroundDarker={'#003366'}
                    style={{marginBottom: '10%'}}
                >
                    Sign Out
                </AwesomeButtonRick>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        padding: '3%',
        paddingHorizontal: '6%',
        backgroundColor: '#003366',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
        height: '100%',
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: 'bold'
    }, 
    mainContainer: {
        flex: 9.5,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20
    }, 
    container: {
        flex: 1,
    },
    headerText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'left',
        paddingVertical: '2%',
        paddingHorizontal: '5%'
    },
    progressContainer: {
        flex: 1
    },
    profileStats: {
        flexDirection: 'column',
        paddingBottom: 20
    },
    profileStatsContainer: {
        flexDirection: 'row',
        width: '100%'
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
    buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
        borderColor: '#666666',
        borderRadius: 15,
        borderWidth: 1.5,
        padding: 10,
        paddingHorizontal: '10%'
	},
})
