import React from 'react';
import Navigator from './src/components/Routes';

export default class App extends React.Component {
	render() {
		{
			console.disableYellowBox = true;
		}
		return <Navigator />;
	}
}
