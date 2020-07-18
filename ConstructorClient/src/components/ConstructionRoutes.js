import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ConstructionEntry from '../screens/construction/ConstructionEntry'
import ConstructionInstructions from '../screens/construction/ConstructionInstructions'
import FinalQualityChecklist from '../screens/construction/FinalQualityChecklist'
import TutorialSteps from '../screens/construction/TutorialSteps'
import TutorialVideo from '../screens/construction/TutorialVideo'
import TutorialTips from '../screens/construction/TutorialTips'
import RoundReport from '../screens/construction/RoundReport'
import Success from '../screens/construction/Success'

const Stack = createStackNavigator()

export default function ConstructionRoutes() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='ConstructionEntry' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='ConstructionEntry' component={ConstructionEntry} />
                <Stack.Screen name='ConstructionInstructions' component={ConstructionInstructions} />
                <Stack.Screen name='TutorialSteps' component={TutorialSteps} />
                <Stack.Screen name='TutorialVideo' component={TutorialVideo} />
                <Stack.Screen name='TutorialTips' component={TutorialTips} />
                <Stack.Screen name='FinalQualityChecklist' component={FinalQualityChecklist} />
                <Stack.Screen name='RoundReport' component={RoundReport} />
                <Stack.Screen name='Success' component={Success} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
