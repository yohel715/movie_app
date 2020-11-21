import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import constants from '../utils/constants';

export const ProfileScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<MaterialCommunityIcons name="face-profile" size={128} color={constants.COLORS.WARNING}/>
			<Text style={styles.textProfile}>Profile</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textProfile: {
		fontSize: 24,
		fontWeight: 'bold',
		letterSpacing: 1,
		color: constants.COLORS.WARNING,
	}
});