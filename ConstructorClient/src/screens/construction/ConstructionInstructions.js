import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue';

export default function ConstructionInstructions(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.welcome}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
                    <Icon name='ios-arrow-back' size={28} color='white' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Construction Instructions</Text>
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity 
                    style={[styles.stepContainer, {borderBottomWidth: 0}]}
                    onPress={() => props.navigation.navigate('TutorialSteps')}
                >
                    <Text style={styles.stepText}>Step-By-Step Tutorial</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.stepContainer, {borderBottomWidth: 0}]}
                    onPress={() => props.navigation.navigate('TutorialVideo')}
                >
                    <Text style={styles.stepText}>Full Video Tutorial</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.stepContainer, {borderBottomWidth: 0}]}
                    onPress={() => props.navigation.navigate('TutorialTips')}
                >
                    <Text style={styles.stepText}>Construction Tips</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.stepContainer}
                    onPress={() => props.navigation.navigate('BrokenShieldForm')}
                >
                    <Text style={styles.stepText}>Report Broken Shield</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <AwesomeButtonRick 
                    type='anchor'
                    onPress={() => props.navigation.navigate('FinalQualityChecklist')}
                    borderRadius={15}
                    stretch={true}
                    backgroundColor={'#003366'}
                    backgroundDarker={'#003366'}
                >
                    Proceed to Final Checklist
                </AwesomeButtonRick>
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
        flex: 6,
        paddingTop: '10%',
        justifyContent: 'center'
    },
    stepText: {
        fontSize: 25,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    stepContainer: {
        paddingVertical: '5%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)',
    },
    buttonContainer: {
        flex: 3.5,
        justifyContent: 'center',
        paddingHorizontal: 20
    }
});
