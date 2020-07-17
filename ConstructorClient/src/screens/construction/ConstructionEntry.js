import React, { useContext } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import { UserContext } from '../../components/UserContext'

export default function ConstructionEntry(props) {
    const userContext = useContext(UserContext)
    const assignedShields = userContext.numMasksAssigned
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.bannerHeaderText}>Construct Shields</Text>
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
            </View>

            <View style={styles.bottomContainer}>
                <Text style={[styles.normalText, {paddingLeft: 20}]}>Complete these three steps</Text>

                <TouchableOpacity 
                    style={[styles.stepContainer, {borderBottomWidth: 0}]}
                    onPress={() => props.navigation.navigate('KitConfirmation')}
                >
                    <Text style={styles.stepText}>1. Face Shield Kit Confirmation</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.stepContainer, {borderBottomWidth: 0}]}
                    onPress={() => props.navigation.navigate('ConstructionInstructions')}
                >
                    <Text style={styles.stepText}>2. Construction Instructions</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.stepContainer}
                    onPress={() => props.navigation.navigate('FinalQualityChecklist')}
                >
                    <Text style={styles.stepText}>3. Final Quality Checklist</Text>
                </TouchableOpacity>

                <View style={{paddingTop: '8%', paddingHorizontal: 20}}>
                    <AwesomeButtonRick 
                        type='anchor'
                        onPress={() => props.navigation.navigate('BrokenShieldForm')}
                        borderRadius={15}
                        stretch={true}
                        backgroundColor={'#003366'}
                        backgroundDarker={'#003366'}
                    >
                        Report Broken Shield
                    </AwesomeButtonRick>
                </View>
            </View>
        </SafeAreaView>
    )
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
        flex: 2,
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
    },
    bottomContainer: {
        flex: 6,
        paddingVertical: 15
    },
    normalText: {
        fontSize: 15,
        paddingBottom: 15
    },
    stepText: {
        fontSize: 20,
        paddingHorizontal: 20
    },
    stepContainer: {
        paddingVertical: '5%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)',
    }
})
