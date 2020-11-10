import React, {useEffect, useState} from 'react'
import { View, ScrollView,  Text, Image, StyleSheet, Dimensions } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import axios from '../utils/axios';

import { DateTime } from "luxon";

import constants from '../utils/constants';

import Stars from '../components/Start';
import CastAndCrew from '../components/CastAndCrew';

const { width, height } = Dimensions.get('screen');

const imageWidth = 130;
const imageMargin = imageWidth + 25;
const imageHeight = 200;


export const DetailsScreen = ({ navigation, route }) => {
    
    const { movie } = route.params;

    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    
    const date = DateTime.fromISO(movie.release_date)
    .setLocale("es")
    .toFormat("MMM, y");

    useEffect(() => {
		axios
			.get(`movie/${movie.id}/credits?api_key=${constants.API_KEY}&language=es-ES`)
			.then((res) => {
				// console.log(JSON.stringify(res.data, null, 2));
				setCast(res.data.cast);
				setCrew(res.data.crew);
			})
			.catch((err) => console.log(err));
	}, [setCast, setCrew]);


    useEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => {
                return (
                    <View style={styles.containerButtonIcon}>
                        <MaterialIcons
                            name="keyboard-backspace"
                            size={24}
                            color={constants.COLORS.LIGHT}
                            {... props}
                            
                        />
                  </View>  
                );
            },
            headerRight: (props) => {
                return (
                    <View style={styles.containerButtonIcon}>
                        <MaterialCommunityIcons
                            name="dots-horizontal"
                            size={24}
                            color={constants.COLORS.LIGHT}
                        />
                  </View>  
                );
            } ,     
        }); 
    });

    return (
        <ScrollView style={styles.container} stickyHeaderIndices={[0,1]}>
            <View style={styles.imageContainer}>
                <Image
                    
                    style={[StyleSheet.absoluteFill, styles.cover]}
                    blurRadius= {1}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }}
                    >
                </Image>
                <View style={styles.backdrop}/>
            </View>
            <View style={styles.content}>
                <Image
                    resizeMode="cover"
                    style={styles.poster}
					source={{
						uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
					}}
				/>

                <View style={{ flex: 1, marginLeft: imageMargin }}> 
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> {movie.title} </Text>
                    </View>
                    <Text style={styles.popularity}> {movie.popularity.toFixed(0)} </Text>
                    <Text style={styles.release_date}> {date} </Text>
                    
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Stars realVotes={Math.floor(movie.vote_average / 2)} />
                        <Text style={styles.votes}> {movie.vote_average} </Text>
                    </View>

                </View>
                <View style={styles.contentSecondary}>
                    <View style={styles.secondaryContent}>
                        <Text style={styles.title}>Resume</Text>
                        <Text style={styles.paragraph}>{movie.overview}</Text>
                    </View>
                    <CastAndCrew navigation={navigation} cast={cast} />
                    <CastAndCrew navigation={navigation} crew={crew} />
                </View>
            </View>
            <View style={{height : 100}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.COLORS.LIGHT,
    },
    imageContainer: {
        position: 'relative',
        width,
        height: height / 3,
    },
    cover: {
        width: null,
        height: null,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: constants.COLORS.WARNING,
        opacity: 0.3,
        zIndex: 9,
    },
    content: {
        position: 'relative',
        width,
        padding: 10,
        paddingBottom: 0,
        backgroundColor: constants.COLORS.LIGHT,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        top: -30,
        zIndex: 9,
    },
    contentSecondary: {
        position: 'relative',
        width,
        paddingHorizontal: 30,
        backgroundColor: constants.COLORS.LIGHT,
        top: 50,
        zIndex: 10,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        paddingRight: 10,
    },
    title: {
        color: constants.COLORS.TEXT_COLOR,
        fontWeight: "bold",
        flexGrow: 1,
        flexWrap: "wrap",
        marginRight: 20,
        fontSize:16,
    },
    votes: {
        color: constants.COLORS.WARNING,
        fontWeight: "bold",
        fontSize: 12,
        marginTop: 8,
        marginLeft: 8,
    },
    popularity: {
        borderColor: constants.COLORS.PRIMARY,
        borderWidth: 1,
        width: 40,
        borderRadius: 4,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
        fontWeight: "300",
    },
    release_date: {
        fontSize: 12,
        textTransform: "capitalize",
        paddingBottom: 10,
    },
    poster: {
        position: "absolute",
        width: imageWidth,
        height: imageHeight,
        borderRadius: 16,
        top: -50,
        left: 20,
    },
    secondaryContent: {
        marginTop: 20,
    },
    paragraph: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '300',
        color: constants.COLORS.GRAY,
        lineHeight: 22,
    },
    containerButtonIcon: {
        backgroundColor: constants.COLORS.PRIMARY2,
        marginTop: 25,
		borderRadius: 20,
		width: 36,
		height: 36,
		margin: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});