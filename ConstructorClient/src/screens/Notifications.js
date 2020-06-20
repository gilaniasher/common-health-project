import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default function Notifications() {

    const data = [
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
        {
            selected: false,
            notification: 'Lorem ipsum dolor sit amet, consetetur sadip scing elitr, sed diam nonumy eirmod',
            time: '8:00 am today'
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Notifications</Text>
            </View>
            <View style={styles.notificationList}>
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
            </View>
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
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        backgroundColor: '#003366'
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
});
