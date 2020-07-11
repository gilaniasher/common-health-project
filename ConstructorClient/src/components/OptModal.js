import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'

export default function OptModal(props) {

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={props.visible}
            onRequestClose={() => console.log('Modal has been closed')}
        >
            <View style={styles.centeredView}>
                <Text style={styles.modalHeader}>You have currently opted out from building</Text>
                <AwesomeButtonRick
                    type='anchor'
                    onPress={() => console.log('Pulling up the opt in form')}
                    borderRadius={15}
                    stretch={true}
                    backgroundColor={'#003366'}
                    backgroundDarker={'#003366'}
                >
                    Opt In for Next Round
                </AwesomeButtonRick>
            </View>
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
    modalHeader: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: '20%',
        fontWeight: 'bold'
    }
})
