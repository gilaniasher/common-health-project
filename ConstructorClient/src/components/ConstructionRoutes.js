import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ConstructionEntry from '../screens/construction/ConstructionEntry';
import KitConfirmation from '../screens/construction/KitConfirmation';
import ConstructionInstructions from '../screens/construction/ConstructionInstructions';
import FinalQualityChecklist from '../screens/construction/FinalQualityChecklist';

const Stack = createStackNavigator();

export default function ConstructionRoutes() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='ConstructionEntry'>
                <Stack.Screen name='ConstructionEntry' component={ConstructionEntry} />
                <Stack.Screen name='KitConfirmation' component={KitConfirmation} />
                <Stack.Screen name='ConstructionInstructions' component={ConstructionInstructions} />
                <Stack.Screen name='FinalQualityChecklist' component={FinalQualityChecklist} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
