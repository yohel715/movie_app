
import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';

import Tabs from './Router';

import LoadAssets from './src/utils/loadAssets';

import { fonts } from './src/utils/fonts';

const assets = [];

const App = () => {
	return (
		<LoadAssets {...{ assets, fonts }}>
			<View style={{ flex: 1 }}>
				<StatusBar barStyle={'light-content'}></StatusBar>
				<Tabs></Tabs>
			</View>
		</LoadAssets>
	);
};

export default App;