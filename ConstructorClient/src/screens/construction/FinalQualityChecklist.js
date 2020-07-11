import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Modal, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/blue'

export default function FinalQualityChecklist(props) {
    const [modalVisible, setModalVisible] = useState(false);

    const [state, setState] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
    })

    const changeState = (id, val) => {
        setState(prevState => ({
            ...prevState,
            [id]: val
        }))
    }

    const data = [
        {
            id: 1,
            notification: 'The serial number is placed on the SAME SIDE as the NJIT logo and on the top left of the white band.',
            image: 'https://picsum.photos/50/50'
        },
        {
            id: 2,
            notification: 'The Foam is placed on the bottom backside of the band and on the opposite side of the NJIT logo.',
            image: 'https://picsum.photos/51/50'
        },
        {
            id: 3,
            notification: 'The PET shield is placed on the same side as the NJIT logo and on top of both halves of the band.',
            image: 'https://picsum.photos/52/50'
        },
        {
            id: 4,
            notification: 'The black strap is weaved through on only one side 1\" of slack.',
            image: 'https://picsum.photos/53/50'
        },
        {
            id: 5,
            notification: 'The tool is NOT returned in the bag.',
            image: 'https://picsum.photos/54/50'
        },
    ]; 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
                    <Icon name='ios-arrow-back' size={28} color='white'/>
                </TouchableOpacity>
                <Text style={styles.titleText}>Final Quality Checklist</Text>
            </View>

            <View style={styles.notificationList}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                    
                        <View style={styles.dataRow}>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}> 

                                    <View style={styles.centeredView}>
                                        <Image source={{uri: item.image}} style={styles.image}/>
                                        
                                        <TouchableOpacity
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={styles.closeImage}>Close Image</Text>
                                        </TouchableOpacity>
                                    </View>

                            </Modal>
                            <TouchableOpacity 
                                style= {[styles.checkBox, {backgroundColor: state[item.id] ? 'black' : 'white'}]}
                                onPress= {() => changeState(item.id, !state[item.id])}>
                            </TouchableOpacity>

                            <Text style={styles.notification}>{item.notification}</Text>

                            <TouchableOpacity 
                                style={styles.infoButton}
                                onPress={() => setModalVisible(true)}>
                                <Icon name='help-circle-outline' size={20}/>
                            </TouchableOpacity>

                        </View>

                    }
                    keyExtractor={item => item.id}
                />
            </View>

            {state[1] && state[2] && state[3] && state[4] && state[5] && 
                <AwesomeButtonRick 
                type='anchor'
                borderRadius={20}
                stretch={true}
                style={styles.submitButton}
                >
                    Submit
                </AwesomeButtonRick>
            }

        </SafeAreaView>
    );
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
        width: '6%',
        height: '30%',
        borderColor: 'black',
        borderWidth: 1,
        margin: '5%',
    },
    dataRow: {
        flexDirection: 'row',
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignItems: 'center',
    },
    notification: {
        color: 'black',
        marginVertical: '5%',
        width: '70%',
    },
    infoButton: {
        margin: '5%',
    },
    submitButton: {
        width: '70%',
        alignSelf: 'center',
        marginBottom: '10%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(46, 49, 49, 0.9)",
    },
    image: {
        height: '30%',
        width: '50%',
    },
    closeImage: {
        color: 'white'
    }
});
