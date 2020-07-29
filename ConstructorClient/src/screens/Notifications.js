import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const data = [
    {
        id: 1,
        selected: false,
        notification: 'Morris County kits will be delivered on July 20th',
        time: '8:00 am today'
    },
    {
        id: 2,
        selected: false,
        notification: 'Morris County kits will be picked up on July 27th',
        time: '8:00 am today'
    },
    {
        id: 3,
        selected: false,
        notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
        time: '8:00 am today'
    },
    {
        id: 4,
        selected: false,
        notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
        time: '8:00 am today'
    },
    {
        id: 5,
        selected: false,
        notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
        time: '8:00 am today'
    },
    {
        id: 6,
        selected: false,
        notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
        time: '8:00 am today'
    },
    {
        id: 7,
        selected: false,
        notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
        time: '8:00 am today'
    },
    {
        id: 8,
        selected: false,
        notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
        time: '8:00 am today'
    },
    {
        id: 9,
        selected: false,
        notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
        time: '8:00 am today'
    },
    {
        id: 10,
        selected: false,
        notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
        time: '8:00 am today'
    },
    {
        id: 11,
        selected: false,
        notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
        time: '8:00 am today'
    },
];

export const NotificationArea = (props) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) =>
                <View style={styles.dataRow}>
                    <TouchableOpacity 
                    color= {item.selected ? 'gray' : 'white'}
                    style= {styles.selectButton}>
                    </TouchableOpacity>

                    <View style={styles.dataCol}>
                        <Text style={styles.notification}>{item.notification}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                </View>
            }
            keyExtractor={item => item.id}
            contentContainerStyle={{
                flexGrow: 1,
            }}
        />
    )
}

export default function Notifications(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
                    <Icon name='ios-arrow-back' size={28} color='white' />
                </TouchableOpacity>
                <Text style={styles.titleText}>Notifications</Text>
            </View>
            <View style={styles.notificationList}>
                <NotificationArea/>
            </View>
        </SafeAreaView>
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
        marginTop: '8%',
        marginLeft: '7%',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    notificationList: {
        flex: 6,
    },
    selectButton: {
        borderRadius: 100,
        width: '3%',
        height: '14%',
        borderColor: 'black',
        borderWidth: 1,
        margin: '5%'
    },
    dataRow: {
        marginTop: '5%',
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    dataCol: { 
        flexDirection: 'column',
        flex: 7,
    },
    notification: {
        color: 'black',
        marginBottom: '2%',
    },
    time: {
        color: 'gray',
        opacity: 0.8,
        paddingBottom: '6%',
    },
})
