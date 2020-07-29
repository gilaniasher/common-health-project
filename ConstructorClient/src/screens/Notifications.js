import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const NotificationArea = (props) => {
    const formatData = (data) => {
        let counter = 0
        
        return data.map((item) => {
            return {
                id: counter++,
                selected: false,
                time: item[0],
                title: item[1],
                body: item[2]

            }
        })
    }

    return (
        <FlatList
            data={formatData(props.data)}
            renderItem={({ item }) =>
                <View style={styles.dataRow}>
                    <TouchableOpacity color= {item.selected ? 'gray' : 'white'} style= {styles.selectButton} />

                    <View style={styles.dataCol}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text style={styles.notificationBody}>{item.body}</Text>
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
                <NotificationArea data={props.route.params.data} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        width: '4%',
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
    notificationTitle: {
        color: 'black',
        marginBottom: '2%',
        fontWeight: 'bold',
        fontSize: 15
    },
    notificationBody: {
        color: 'black',
        marginBottom: '2%',
    },
    time: {
        color: 'gray',
        opacity: 0.8,
        paddingBottom: '6%',
    },
})
