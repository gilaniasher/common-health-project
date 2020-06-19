import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DevLinks from '../screens/DevLinks';
import TabNavigator from '../screens/TabNavigator';

import Entry from '../screens/Entry';
import Signup from '../screens/Signup';
import Login from '../screens/Login';

import Dashboard from '../screens/Dashboard';
import Notifications from '../screens/Notifications';

import ConstructionEntry from '../screens/construction/ConstructionEntry';

import TimelineScreen from '../screens/TimelineScreen';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
		
const navigator = createStackNavigator(
	{
        DevLinks: {
            screen: DevLinks,
            navigationOptions: { headerShown: false }
        },
        TabNavigator: {
            screen: TabNavigator,
            navigationOptions: { headerShown: false }
        },
        Entry: {
            screen: Entry,
            navigationOptions: { headerShown: false }
        },
        Signup: {
            screen: Signup,
            navigationOptions: { headerShown: false }
        },
        Login: {
            screen: Login,
            navigationOptions: { headerShown: false }
        },

        Dashboard: {
            screen: Dashboard,
            navigationOptions: { headerShown: false }
        },
        Notifications: {
            screen: Notifications,
            navigationOptions: { headerShown: false }
        },
        ConstructionEntry: {
            screen: ConstructionEntry,
            navigationOptions: { headerShown: false }
        },
        TimelineScreen: {
            screen: TimelineScreen,
            navigationOptions: { headerShown: false }
        },
        Profile: {
            screen: Profile,
            navigationOptions: { headerShown: false }
        },
        Settings: {
            screen: Settings,
            navigationOptions: { headerShown: false }
        },
	},
	{
		initialRouteName: 'DevLinks'
	}
);

export default createAppContainer(navigator);
