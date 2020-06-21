import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';
import NotificationBubble from '../components/NotificationBubble';
import logo from '../images/logo.png';

// Temp default values
const initialName = 'Asher';
const initialRoundNumber = 3;
const initialAssignedShields = 40;
const initialOptedOut = false;
const initialNotifications = [
    { id: 1, text: 'Shields delivered' },
    { id: 2, text: 'Driver has arrived' },
    { id: 3, text: 'Cured cancer' },
    { id: 4, text: 'Found world peace' },
    { id: 5, text: 'Became the kung fu panda' },
    { id: 6, text: 'Found nirvana' },
]

export default function Dashboard(props) {
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
            <NotificationBubble
                text={item.text}
                profImage={logo}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.bannerHeaderText}>Welcome {firstname}</Text>
            </View>

            <View style={styles.progressContainer}>
                <Text style={styles.headerText}>Shields Assigned This Round</Text>

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
                    onPress={() => console.log('Construct shields')}
                    borderRadius={15}
                    stretch={true}
                    backgroundColor={'#003366'}
                    backgroundDarker={'#003366'}
                >
                    Construct Shields
                </AwesomeButtonRick>

                <View style={styles.verticalSpacer} />

                <Text style={styles.normalText}>
                    Most Recent Notifications
                </Text>

                <View />

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
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 20
    },
    verticalSpacer: {
        height: '8%'
    }, 
    notifications: {
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: 'rgba(128, 128, 128, 0.5)',
        padding: 20,
        paddingBottom: 0
    }
});
