import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const reducingFactor = 9;

export default class NotificationBubble extends React.Component {
	render() {
		return (
            <View style={styles.container}>
                <Image source={this.props.profImage} style={styles.profImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.textBox}>{this.props.text}</Text>
                </View>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    textContainer: {
        width: '60%',
        borderRadius: 20,
        borderTopLeftRadius: 0,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: '2%',
        marginTop: '5%',
    },
    textBox: {
        color: 'black'
    },
    profImage: {
        width: Math.min(width, height) / reducingFactor,
        height: Math.min(width, height) / reducingFactor,
        borderRadius: Math.min(width, height) / (reducingFactor * 2)
    }
});
