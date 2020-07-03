import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from '../screens/TabNavigator';

import Entry from '../screens/Entry';
import Signup from '../screens/Signup';
import Login from '../screens/Login';

import DashboardRoutes from '../components/DashboardRoutes';
import Notifications from '../screens/Notifications';

import TimelineScreen from '../screens/TimelineScreen';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';

import ConstructionRoutes from '../components/ConstructionRoutes';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Entry' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='TabNavigator' component={TabNavigator} />
                <Stack.Screen name='Entry' component={Entry} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='DashboardRoutes' component={DashboardRoutes} />
                <Stack.Screen name='Notifications' component={Notifications} />
                <Stack.Screen name='TimelineScreen' component={TimelineScreen} />
                <Stack.Screen name='Profile' component={Profile} />
                <Stack.Screen name='Settings' component={Settings} />
                <Stack.Screen name='ConstructionRoutes' component={ConstructionRoutes} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
