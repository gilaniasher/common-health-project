import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Icon from 'react-native-vector-icons/Ionicons'
import Unorderedlist from 'react-native-unordered-list'

import SerialSticker from './tutorial_images/serial_sticker.png'
import RemoveAdhesive from './tutorial_images/remove_adhesive.png'
import AttachFoam from './tutorial_images/attach_foam.png'
import AttachStrap from './tutorial_images/attach_strap.png'
import ShieldToBand from './tutorial_images/shield_to_band.png'
import Bag from './tutorial_images/bag.png'

const slides = [
  {
    key: 1,
    title: 'Attach Serial # Sticker to Band',
    text: [
      'The sticker goes on the front of the band',
      'Please alert staff if sticker is damaged'
    ],
    image: SerialSticker
  },
  {
    key: 2,
    title: 'Remove Foam Adhesive',
    text: [
      'Use an exacto/butter knife to peel away the foam adhesive',
      'See construction tips for help on removing the foam adhesive'
    ],
    image: RemoveAdhesive
  },
  {
    key: 3,
    title: 'Attach Foam Strip',
    text: [
      'Foam strip goes on the back of the band',
      'Center the foam between the buckles'
    ],
    image: AttachFoam,
    style: { width: '96%', height: '40%' }
  },
  {
    key: 4,
    title: 'Attach Strap',
    text: [
      'Follow the images above to attach the strap',
      'The full video tutorial may be helpful to see how to do this'
    ],
    image: AttachStrap
  },
  {
    key: 5,
    title: 'Attach PET Shield to Band',
    text: [
      'Align clear shield slot over T-tab on white band',
      'Use dowel pin to push white tab through clear shield slot',
      'Fold tabs flat, trapping shield'
    ],
    image: ShieldToBand,
    style: { width: '96%', height: '35%' }
  },
  {
    key: 6,
    title: 'Place Shield into Bag with Instructions',
    text: [
      'Ensure shield is clean',
      'Slide both the shield and instructions into the bag',
      'Put all bags into the original bag that was given',
      'Now complete the final quality checklist'
    ],
    image: Bag
  },
]

export default function TutorialSteps(props) {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>

                { (item.width && item.height) ?
                    <Image source={item.image} style={[styles.image, {width: item.width, height: item.height}]} />
                  :
                    <Image source={item.image} style={styles.image} />
                }

                <View style={{width: '100%', paddingHorizontal: '5%', flex: 0.7, justifyContent: 'center'}}>
                  {item.text.map(line =>
                    <Unorderedlist style={{fontSize: 20}}>
                      <Text style={styles.text}>{line}</Text>
                    </Unorderedlist>
                  )}
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.welcome}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
                    <Icon name='ios-arrow-back' size={28} color='white' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Tutorial Steps</Text>
            </View>

            <View style={styles.bottomContainer}>
                <AppIntroSlider
                    renderItem={renderItem}
                    data={slides}
                    onDone={() => props.navigation.goBack()}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: 'rgba(44, 130, 201, 0.5)',
      height: '100%'
    },
    image: {
      width: '96%',
      height: '50%',
      marginVertical: '5%',
      borderWidth: 1,
      borderColor: 'black'
    },
    text: {
      fontSize: 16,
      marginTop: '1%'
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
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
  })
