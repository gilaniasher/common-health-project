import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import auth from '@react-native-firebase/auth'

export default function Profile(props) {
    const signout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out')
                props.navigation.navigate('Login')
            })
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Sarah Ryu
                </Text>
            </View>
            <View style={styles.maincontainer}>
                <View style={styles.progressContainer}>
                    <Text style={styles.headerText}>Shields Assigned This Round</Text>

                    <View style={styles.profileStatsContainer}>
                        <View style={styles.profileStats}>
                            <Text style={styles.statsNumber}>2</Text>
                            <Text style={styles.statsText}>Kits</Text>
                        </View>

                        <View style={styles.verticalSeparator} />

                        <View style={styles.profileStats}>
                            <Text style={styles.statsNumber}>20</Text>
                            <Text style={styles.statsText}>Shields</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.progressContainer}>
                    <Text style={styles.headerText}>Total Shield Records</Text>

                    <View style={styles.profileStatsContainer}>
                        <View style={styles.profileStats}>
                            <Text style={styles.statsNumber}>30</Text>
                            <Text style={styles.statsText}>Kits</Text>
                        </View>

                        <View style={styles.verticalSeparator} />

                        <View style={styles.profileStats}>
                            <Text style={styles.statsNumber}>300</Text>
                            <Text style={styles.statsText}>Shields</Text>
                        </View>
                    </View>
                </View>
                
                <View style={{flex: 3}}>
                    <Text style={styles.headerText}>You are building shields next round</Text>
                    <TouchableOpacity style={styles.buttonContainer}>
						<Text style={{ color: '#666666', fontSize: 24 }}>
							Invite Friends
            			</Text>
					</TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
						<Text style={{ color: '#666666', fontSize: 24 }}>
							Settings
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
                >
                    Sign Out
                </AwesomeButtonRick>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1.2,
        backgroundColor: '#003366',
        alignItems: 'center'
    },
    title: {
        marginTop: Platform.OS == 'ios' ? '20%' : '1%',
        marginHorizontal: '18%',
        textAlign: 'center',
        lineHeight: 49,
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    maincontainer: {
        flex: 9.5,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20
    }, 
    container: {
        flex: 1,
    },
    headerText: {
        width: '100%',
        color: 'black',
        fontSize: 20,
        textAlign: 'left',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
    },
    progressContainer: {
        flex: 1.5,
        paddingBottom: 30,
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
    }, buttonContainer: {
		alignItems: 'center',
		justifyContent: 'center',
        marginBottom: '3%',
        borderColor: '#666666',
        borderRadius: 10,
        borderWidth: 2
	},
});
