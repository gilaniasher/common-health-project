import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Modal, Image} from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'
import pic1 from '../../images/FinalQualityChecklist/step1.png'
import pic2 from '../../images/FinalQualityChecklist/step2.png'
import pic3 from '../../images/FinalQualityChecklist/step3.png'
import pic4 from '../../images/FinalQualityChecklist/step4.png'
import pic5 from '../../images/FinalQualityChecklist/step5.jpg'

const data = [
    {
        id: 1,
        notification: 'The serial number is placed on the SAME SIDE as the NJIT logo and on the top left of the white band.',
        image: pic1
    },
    {
        id: 2,
        notification: 'The Foam is placed on the bottom backside of the band and on the opposite side of the NJIT logo.',
        image: pic2
    },
    {
        id: 3,
        notification: 'The PET shield is placed on the same side as the NJIT logo and on top of both halves of the band.',
        image: pic3
    },
    {
        id: 4,
        notification: 'The black strap is weaved through on only one side 1\" of slack.',
        image: pic4
    },
    {
        id: 5,
        notification: 'The tool is NOT returned in the bag.',
        image: pic5
    },
] 

export default function FinalQualityChecklist(props) {
    const [modalVisible, setModalVisible] = useState(false)
    const [state, setState] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        currentImage: null
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    const submitBtn = () => {
        props.route.params.changeState('finalChecklistCompleted', true)
        props.navigation.goBack()
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}> 

                    <View style={styles.centeredView}>
                        <Image source={state.currentImage} style={styles.image}/>
                        
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.closeImage}>Close Image</Text>
                        </TouchableOpacity>
                    </View>

            </Modal>

            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
                        <Ionicon name='ios-arrow-back' size={28} color='white'/>
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Final Quality Checklist</Text>
                </View>

                <View style={styles.notificationList}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) =>
                        
                            <View style={[styles.dataRow, {backgroundColor: item.id % 2 === 1 ? 'lightgray' : 'white'}]}>
                                
                                {!state[item.id] && <TouchableOpacity 
                                    style= {[styles.checkBox, {backgroundColor: state[item.id] ? 'darkgreen' : 'white'}]}
                                    style={styles.checkBox}
                                    onPress= {() => changeState(item.id, !state[item.id])}>
                                        
                                </TouchableOpacity>}

                                {state[item.id] && 
                                        <TouchableOpacity onPress={() => changeState(item.id, !state[item.id])}>
                                            <Ionicon size={50} style={{margin:20}} color='green' name='ios-checkmark'/>
                                        </TouchableOpacity>
                                }

                                <Text style={styles.notification}>{item.notification}</Text>

                                <TouchableOpacity 
                                    style={styles.infoButton}
                                    onPress={() => {
                                        changeState('currentImage', item.image)
                                        setModalVisible(true)
                                    }}>
                                    <MaterialIcons name='info-outline' size={25} color='black'/>
                                </TouchableOpacity>

                            </View>

                        }
                        keyExtractor={item => item.id}
                    />

                    {(state[1] && state[2] && state[3] && state[4] && state[5]) &&  
                        <AwesomeButtonRick 
                        type='anchor'
                        borderRadius={20}
                        stretch={true}
                        style={styles.submitButton}
                        onPress={submitBtn}
                        >
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                                I have done all these things!
                            </Text>
                        </AwesomeButtonRick> 
                    }
                </View>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        backgroundColor: '#003366',
    },
    backButton: {
        paddingTop: '9%',
        paddingLeft: '5%'
    },
    titleText: {
        marginTop: '7%',
        marginLeft: '7%',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    notificationList: {
        flex: 6,
    },
    checkBox: {
        width: '4%',
        height: '20%',
        borderColor: 'black',
        borderWidth: 1,
        margin: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataRow: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
    },
    notification: {
        color: 'black',
        marginVertical: '5%',
        width: '70%',
    },
    infoButton: {
        margin: '5%',
        width: '26%'
    },
    submitButton: {
        width: '70%',
        alignSelf: 'center',
        marginBottom: '8%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(46, 49, 49, 0.9)",
    },
    image: {
        height: '40%',
        width: '90%',
    },
    closeImage: {
        color: 'white',
        paddingTop: '5%',
        fontSize: 18
    },
})
