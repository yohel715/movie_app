import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import axios from '../utils/axios';

import constants from "../utils/constants";

import Movie from "../components/Movie";

export const HomeScreen = ({ navigation, rute }) => {
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
    <View style={styles.container}>
        <FlatList
        style={styles.list}
        data={movies}
        renderItem={({ item }) => <Movie movie={item} navigation={navigation}/>}
        keyExtractor={(item) => `${item.id}`}
        />
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.COLORS.LIGHT_GRAY,
  },
    list: {
      paddingHorizontal: 25,
  },
});