import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import { kitSignup } from '../actions/KitSignup'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function OptModal(props) {
    const [formVisible, setFormVisible] = useState(false)
    const [state, setState] = useState({
        numKits: 0
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    const initKitSignup = () => {
        kitSignup(props.uid, state.numKits)
    }

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={() => console.log('Modal has been closed')}
        >
                {formVisible ?
                    <View style={styles.formContainer}>
                        <View style={styles.backContainer}>
                            <TouchableOpacity onPress={() => setFormVisible(false)}>
                                <Text style={styles.backButton}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 9.5, alignItems: 'center'}}>
                            <Text style={styles.formText}>How many face shield kits do you want delivered?{'\n\n'}(1 kit = 10 shields)</Text>
                            <NumericInput
                                type='up-down'
                                onChange={value => changeState('numKits', value)}
                                rounded
                                minValue={0}
                                maxValue={30}
                                editable={false}
                                textColor='white'
                                totalWidth={width * 0.7}
                                totalHeight={height * 0.15}
                            />
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
                                    Sign Up for Kits
                                </AwesomeButtonRick>
                            }
                        </View>
                    </View>
                    :
                    <View style={styles.centeredView}>
                        <Text style={styles.modalHeader}>You have currently opted out from building</Text>
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
                    </View>
                }
        </Modal>
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
    backContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: '18%'
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
        marginTop: '20%'
    },
    formText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        paddingBottom: '20%'
    },
    modalHeader: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: '20%',
        fontWeight: 'bold'
    }
})
