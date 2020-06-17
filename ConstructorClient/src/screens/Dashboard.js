import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';

// Temp default values
const initialName = 'Asher';
const initialRoundNumber = 3;
const initialAssignedShields = 40;
const initialOptedOut = false;
const initialNotifications = [
    { id: 1, text: 'Shields delivered' },
    { id: 2, text: 'Driver has arrived' },
]

export default function Dashboard() {
    const [firstname, setFirstname] = useState(initialName);
    const [roundNumber, setRoundNumber] = useState(initialRoundNumber);
    const [assignedShields, setAssignedShields] = useState(initialAssignedShields);
    const [optedOut, setOptedOut] = useState(initialOptedOut);
    const [notifications, setNotifications] = useState(initialNotifications);

    useEffect(() => {
        // API call to load data and set all of the values
    }, []);

    const renderNotification = ({ item }) => {
        return (
            <Text style={styles.normalText}>{item.text}</Text>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bannerContainer}>
                <Text style={styles.bannerHeaderText}>Hi {firstname}, for Round #{roundNumber}</Text>

                <View style={styles.profileStatsContainer}>
                    <View style={styles.profileStats}>
                        <Text style={styles.statsNumber}>{assignedShields / 10}</Text>
                        <Text style={styles.statsText}>Kits</Text>
                    </View>

                    <View style={styles.verticalSeparator} />

                    <View style={styles.profileStats}>
                        <Text style={styles.statsNumber}>{assignedShields}</Text>
                        <Text style={styles.statsText}>Shields</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.normalText}>
                {
                    (optedOut) ? 
                        "You aren't building shields for the next round :("
                        : "You're building shields next round!"
                }
                </Text>

                <AwesomeButtonRick 
                    type='anchor'
                    onPress={() => console.log('Opt Out')}
                    borderRadius={15}
                    stretch={true}
                    backgroundColor={(optedOut) ? '#003366' : '#D3D3D3'}
                    backgroundDarker={(optedOut) ? '#003366' : '#D3D3D3'}
                >
                    Opt Out
                </AwesomeButtonRick>

                <View style={styles.verticalSpacer} />

                <Text style={styles.normalText}>
                    Most Recent Notifications
                </Text>

                <FlatList 
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id}
                    style={styles.notifications}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bannerContainer: {
        flex: 1,
        backgroundColor: '#003366',
        alignItems: 'center',
        padding: 20
    },
    bannerHeaderText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    profileStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20
    },
    profileStats: {
        flexDirection: 'column'
    },
    verticalSeparator: {
        borderLeftWidth: 1,
        borderLeftColor: 'white',
    },
    statsNumber: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: '20%',
        fontSize: 35
    },
    statsText: {
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: '20%',
        fontSize: 15,
    },
    bottomContainer: {
        flex: 3.5,
        padding: 20
    },
    normalText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 20
    },
    verticalSpacer: {
        height: '8%'
    }, 
    notifications: {

    }
});
