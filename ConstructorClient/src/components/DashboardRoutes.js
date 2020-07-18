import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/Dashboard';
import Notifications from '../screens/Notifications';

const Stack = createStackNavigator();

export default function DashboardRoutes() {
    return (
        <Stack.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Dashboard' component={Dashboard} />
            <Stack.Screen name='Notifications' component={Notifications} />
        </Stack.Navigator>
    );
}
