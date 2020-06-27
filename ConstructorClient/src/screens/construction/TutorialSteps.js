import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

const slides = [
    {
      key: 1,
      title: '1: Clean Band',
      text: '· Wipe both sides of band with paper towel and IPA solution\n· Orient band as pictured above\n· Attach serial number sticker as shown',
      image: 'https://picsum.photos/seed/picsum/200/300?grayscale',
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: '2: Clean Band',
      text: '· Remove backing from foam and attach to band as shown',
      image: 'https://picsum.photos/seed/picsum/200/300?grayscale',
      backgroundColor: '#59b2ab',
    },
    {
      key: 3,
      title: 'Attach Serial # Sticker',
      text: '· Serial number stickers are in a sequential order and dated!\n· Please only use one sticker\n· If serial sticker is damaged, please alert staff!',
      image: 'https://picsum.photos/seed/picsum/200/300?grayscale',
      backgroundColor: '#59b2ab',
    },
    {
      key: 4,
      title: 'Attach Adhesive Foam',
      text: '· Center adhesive strip between buckles\n· DO NOT center ahesive strip with \"shield band\"',
      image: 'https://picsum.photos/seed/picsum1/200/300?grayscale',
      backgroundColor: '#febe29',
    },
    {
      key: 5,
      title: 'Tip: Removing the Adhesive Foam Backing',
      text: '· Place the exacto-knife as shown: Dull edge contacting where backing meets foam\n· Roll the knife away from you (as if you are rolling it away on a table)\n· The sharp edge will peel the foam from the backing',
      image: 'https://picsum.photos/seed/picsum2/200/300?grayscale',
      backgroundColor: '#22bcb5',
    },
    {
      key: 6,
      title: 'Attach the Strap',
      text: '',
      image: '',
      backgroundColor: '#22bcb5',
    },
    {
      key: 7,
      title: '1: Clean Shield',
      text: '· Wipe down PET shield with paper towel and IPA solution if it needs to be cleaned\n· Align clear shield slot over T-tab on white band (Images 1 & 2)',
      image: '', 
      backgroundColor: '',
    },
    {
      key: 8,
      title: '2: Clean Shield',
      text: '· Use dowel pin to push white tab through clear shield slot\n· Fold tabs flat, trapping shield',
      image: '',
      backgroundColor: '',
    },
    {
        key: 9,
        title: 'Place Shield into Bag with Instructions',
        text: '· Ensure Shield is clean and all previous steps have been completed\n· Slip instructions between shield and band\n· Slide both items into re-sealable bag and lay bag flat in cardboard box\n· 100 shields per box',
        image: '',
        backgroundColor: '',
    },
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
      paddingVertical: 20,
      backgroundColor: 'rgba(44, 130, 201, 0.5)',
    },
    image: {
      width: 225,
      height: 225,
      marginVertical: 32,
      borderWidth: 1,
      borderColor: 'black'
    },
    text: {
      color: 'rgba(0, 0, 0, 0.8)',
      marginBottom: 5,
      fontSize: 15,
      paddingHorizontal: 20
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