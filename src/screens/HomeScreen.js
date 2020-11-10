import React, { useEffect } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	FlatList,
	Platform,
	ScrollView,
	Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import axios from '../utils/axios';

import constants from '../utils/constants';

import Movie from '../components/Movie';

import { fontsNames } from '../utils/fonts';

export const HomeScreen = ({ navigation, route }) => {
	const [movies, setMovies] = React.useState([]);

	useEffect(() => {
		axios
			.get(`movie/popular?api_key=${constants.API_KEY}&language=es-ES`)
			.then((res) => {
				setMovies(res.data.results);
			})
			.catch((err) => console.log(err));
	}, [setMovies]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Movies</Text>
				<Feather name="search" size={18} color="black" />
			</View>
			<FlatList
				style={styles.list}
				data={movies}
				renderItem={({ item }) => <Movie movie={item} navigation={navigation} />}
				keyExtractor={(item) => `${item.id}`}
				contentInset={{ bottom: 80, top: 0 }}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: constants.COLORS.LIGHT_GRAY,
		marginTop: Platform.OS !== 'ios' ? 0	 : 0,
	},
	list: {
		paddingHorizontal: 25,
	},
	titleContainer: {
		paddingHorizontal: 25,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 12,
		marginBottom: 8,
	},
	title: {
		fontFamily: fontsNames.FANCY,
		fontSize: 24,
	},
});