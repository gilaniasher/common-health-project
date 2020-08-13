import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import { kitSignup } from '../actions/KitSignup'
import DropdownAlert from 'react-native-dropdownalert'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'
import { Picker } from '@react-native-community/picker'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function OptModal(props) {
    const [formVisible, setFormVisible] = useState(false)
    const [state, setState] = useState({
        numKits: 0,
        spinner: false,
        invalidRef: React.createRef(),
        signupError: '',
        successMsg: '',
        nextRound: false
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    const initKitSignup = () => {
        changeState('spinner', true)
        kitSignup(props.uid, state.numKits, state.nextRound, changeState, props.changeDashboardState)
    }

    const signout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out')
                props.navigation.navigate('Entry')
            })
    }

    useEffect(() => {
        if (state.signupError !== '') {
            state.invalidRef.alertWithType('error', state.signupError);
            changeState('signupError', '')
        }
    }, [state.signupError])

    useEffect(() => {
        if (state.successMsg !== '') {
            state.invalidRef.alertWithType('info', state.successMsg);
            changeState('successMsg', '')
        }
    }, [state.successMsg])

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={() => console.log('Modal has been closed')}
        >
            <DropdownAlert ref={ref => state.invalidRef = ref} />
            {formVisible ?
                <View style={styles.formContainer}>
                    <View style={styles.backContainer}>
                        <TouchableOpacity onPress={() => setFormVisible(false)}>
                            <Text style={styles.backButton}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 9.5, alignItems: 'center'}}>
                        <Text style={styles.formText}>
                            How many face shield kits do you want to waitlist for?{'\n\n'}
                            (1 kit = 10 shields)
                        </Text>

                        <NumericInput
                            type='up-down'
                            onChange={value => changeState('numKits', value)}
                            rounded
                            minValue={0}
                            maxValue={30}
                            editable={false}
                            textColor='white'
                            totalWidth={width * 0.7}
                            totalHeight={height * 0.13}
                        />

                        <View style={styles.roundPicker}>
                            <Picker
                                selectedValue={state.nextRound}
                                onValueChange={val => changeState('nextRound', val)}
                                style={{ color: '#FFFFFF' }}
                            >
                                <Picker.Item label={'Current Round'} value={false} />
                                <Picker.Item label={'Next Round'} value={true} />
                            </Picker>
                        </View>

                        {state.numKits != 0 &&
                            <AwesomeButtonRick
                                type='anchor'
                                onPress={initKitSignup}
                                borderRadius={15}
                                stretch={true}
                                backgroundColor={'#003366'}
                                backgroundDarker={'#003366'}
                                style={styles.kitButton}
                            >
                                Get on Kit Waitlist!
                            </AwesomeButtonRick>
                        }

                        {state.spinner && 
                            <ActivityIndicator style={styles.spinner} size='large' color='#FFFFFF' />
                        }
                    </View> 
                </View>
                :
                <View style={styles.centeredView}>
                    {props.error !== '' ?
                        <Text style={styles.modalHeader}>{props.error}</Text>
                        :
                        <Text style={styles.modalHeader}>You have currently opted out from building</Text>
                    }
                    
                    {props.error === '' &&
                        <>
                            <AwesomeButtonRick
                                type='anchor'
                                onPress={() => setFormVisible(true)}
                                borderRadius={15}
                                stretch={true}
                                backgroundColor={'#003366'}
                                backgroundDarker={'#003366'}
                            >
                                Opt In for Next Round
                            </AwesomeButtonRick>
                            <Text style={{marginTop: '10%', color: 'white', fontSize: 20}}>Or</Text>
                        </>
                    }

                    <TouchableOpacity style={styles.signoutOpacity} onPress={signout}>
                        <Icon name='sign-out' color='white' size={25} />
                        <Text style={styles.signoutText}>Sign out instead</Text>
                    </TouchableOpacity>
                </View>
            }
        </Modal>
    )
}

const styles = StyleSheet.create({
    spinner: {
        marginTop: '10%'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(46, 49, 49, .98)',
        paddingHorizontal: '5%'
    },
    backContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: '10%'
    },
    backButton: {
        color: 'white',
        textAlign: 'left',
        fontSize: 30
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'rgba(46, 49, 49, .98)',
        padding: '7%'
    },
    kitButton: {
        marginTop: '1%'
    },
    formText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        paddingBottom: '10%'
    },
    modalHeader: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: '20%',
        fontWeight: 'bold'
    },
    signoutOpacity: {
        marginTop: '10%',
        flexDirection: 'row'
    },
    signoutText: {
        color: 'white',
        fontSize: 15,
        marginLeft: '2%'
    },
    roundPicker: {
        borderColor: 'white',
        borderRadius: 200,
        borderWidth: 1,
        height: '10%',
        width: '90%',
        marginVertical: '10%',
        paddingHorizontal: '5%'
    }
})
