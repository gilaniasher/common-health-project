import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ConstructionEntry from '../screens/construction/ConstructionEntry';
import KitConfirmation from '../screens/construction/KitConfirmation';
import ConstructionInstructions from '../screens/construction/ConstructionInstructions';
import FinalQualityChecklist from '../screens/construction/FinalQualityChecklist';
		
const ConstructionNavigator = createStackNavigator(
	{
        ConstructionEntry: {
            screen: ConstructionEntry,
            navigationOptions: { headerShown: false }
        },
        KitConfirmation: {
            screen: KitConfirmation,
            navigationOptions: { headerShown: false }
        }, 
        ConstructionInstructions: {
            screen: ConstructionInstructions,
            navigationOptions: { headerShown: false }
        },
        FinalQualityChecklist: {
            screen: FinalQualityChecklist,
            navigationOptions: { headerShown: false }
        }
	},
	{
		initialRouteName: 'ConstructionEntry'
	}
);

export default ConstructionNavigator;
