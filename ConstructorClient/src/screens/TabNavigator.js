import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from '../screens/Dashboard';
import TimelineScreen from '../screens/TimelineScreen';
import ConstructionRoutes from '../components/ConstructionRoutes';
import Profile from '../screens/Profile';

const routeIcons = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Timeline') {
            iconName = focused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'Construction') {
            iconName = focused ? 'shield-cross' : 'shield-cross-outline'
        } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline'
        }

        return <Icon name={iconName} size={25} color={color} />;
    }
});

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer independent={true}>
        <Tab.Navigator
            initialRouteName="Dashboard"
            barStyle={{ backgroundColor: '#003366'}}
            screenOptions={routeIcons}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Timeline" component={TimelineScreen} />
            <Tab.Screen name="Construction" component={ConstructionRoutes} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}
