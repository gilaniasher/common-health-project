import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';

export default function DevLinks(props) {
	return (
		<SafeAreaView>
			<Text>DevLinks</Text>
			<Button
				title='TabNavigator'
				onPress={() => props.navigation.navigate('TabNavigator')}
			/>
			<Button
				title='Entry'
				onPress={() => props.navigation.navigate('Entry')}
			/>
			<Button
				title='Signup'
				onPress={() => props.navigation.navigate('Signup')}
			/>
			<Button
				title='Login'
				onPress={() => props.navigation.navigate('Login')}
			/>
			<Button
				title='Dashboard'
				onPress={() => props.navigation.navigate('DashboardRoutes')}
			/>
			<Button
				title='Notifications'
				onPress={() => props.navigation.navigate('Notifications')}
			/>
			<Button
				title='ConstructionRoutes'
				onPress={() => props.navigation.navigate('ConstructionRoutes')}
			/>
			<Button
				title='Timeline'
				onPress={() => props.navigation.navigate('Timeline')}
			/>
			<Button
				title='Profile'
				onPress={() => props.navigation.navigate('Profile')}
			/>
			<Button
				title='Settings'
				onPress={() => props.navigation.navigate('Settings')}
			/>
		</SafeAreaView>
	);
}
