import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

const timelineEvents = [
    {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
    {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
]

export default function TimelineScreen() {
    return (
        <View style={styles.container}>
        <Timeline 
            data={timelineEvents} 
            circleColor='#003366'
            lineColor='#003366'
            innerCircle='dot'
            style={styles.list}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    list: {
        flex: 1,
        marginTop: 20
    }
});
