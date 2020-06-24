import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: 'https://picsum.photos/seed/picsum/200/300?grayscale',
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      image: 'https://picsum.photos/seed/picsum1/200/300?grayscale',
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: 'https://picsum.photos/seed/picsum2/200/300?grayscale',
      backgroundColor: '#22bcb5',
    }
];

export default function TutorialSteps(props) {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.welcome}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
                    <Icon name='ios-arrow-back' size={28} color='white' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Kit Confirmation</Text>
            </View>

            <View style={styles.bottomContainer}>
                <AppIntroSlider
                    renderItem={renderItem}
                    data={slides}
                    onDone={() => props.navigation.goBack()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(44, 130, 201, 0.5)',
    },
    image: {
      width: 250,
      height: 250,
      marginVertical: 32,
    },
    text: {
      color: 'rgba(0, 0, 0, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      color: 'black',
      textAlign: 'center',
    },
    container: {
        flex: 1
    },
    welcome: {
        flex: 1,
        backgroundColor: '#003366',
        padding: 20,
        paddingBottom: 0,
        flexDirection: 'row'
    },
    backButton: {
        paddingTop: '1%',
        paddingRight: '5%'
    },
    headerText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    bottomContainer: {
        flex: 9.5,
    }
  });