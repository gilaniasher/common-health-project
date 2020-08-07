import React from 'react'
import Navigator from './src/components/Routes'
import DropdownAlert from 'react-native-dropdownalert'
import DropDownHolder from './src/components/DropDownHolder'

export default class App extends React.Component {
	render() {
		{ console.disableYellowBox = true }
		return (
			<>
				<Navigator />
				<DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)} />
			</>
		)
	}
}
