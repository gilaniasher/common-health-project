import React, { useContext } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ConfettiCannon from 'react-native-confetti-cannon'
import SuccessImg from '../../images/success.jpg'
import { UserContext } from '../../components/UserContext'

const width = Dimensions.get('window').width

export default function Success() {
    const userContext = useContext(UserContext)
    const assignedShields = userContext.numMasksAssigned

    return (
        <ImageBackground
            source={SuccessImg}
            style={{width: '100%', height: '100%'}}
        >            
            <View style={styles.overlay}>
                <ConfettiCannon count={200} origin={{x: -30, y: 0}} /> 
                <View style={styles.checkCircle}>
                    <Icon name='check' color='#003366' size={width / 1.8} />
                </View>
                <View style={styles.congratsTextContainer}>
                    <Text style={[styles.congratsText, {fontWeight: 'bold', fontSize: 35}]}>
                        Congrats!{'\n'}
                    </Text>
                    <Text style={styles.congratsText}>
                        You have completed building {assignedShields} shields for this round!
                    </Text>
                </View>
            </View>
        </ImageBackground>
    )    
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 51, 102, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingTop: '30%',
        paddingBottom: '55%'
    },
    checkCircle: {
        borderRadius: width * 2,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        marginBottom: '15%'
    },
    congratsTextContainer: {
        flex: 2,
        paddingBottom: '20%'
    },
    congratsText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    }
})
