import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions, Platform} from 'react-native'

import { AntDesign, Ionicons } from '@expo/vector-icons';

import constants from '../utils/constants';

const { width } = Dimensions.get('window');

export const CastAndCrew = (navigation, route) => {
    
    console.log(route.params);

    const { cast, crew } = route.params;

    let items = cast ? cast : crew;

    React.useEffect(() => {
        navigation.setOptions({
            title: cast ? 'Actores' : 'Equipo de producción',
        });
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.castContainer}>
                {items.map((item, index) => (
                    <View key={index} style = {styles.card}>
                        {item.profile_path ? (
                            <Image
                                resizeMode="cover"
                                style={styles.image}
                                source={{
                                    uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`,
                                }} />
                        ) : (
                                <View style={styles.iconContainer}>
                                    <Ionicons name="md-person" size={60} color={constants.COLORS.GRAY} />
                                </View>
                                )
                        }
                    </View>
                ))}
                <Text style={{textAlign: 'center'}}> {cast ? item.character : item.department}</Text>
                <Text style={{textAlign: 'center'}}> {item.name}</Text>
            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        marginTop: Platform.OS === 'android' ? 0 : 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: constants.COLORS.TEXT_COLOR,
        fontWeight: "bold",
        flexGrow: 1,
        flexWrap: "wrap",
        marginRight: 20,
        fontSize:16,
    },
    castContainer: {
        flexDirection: 'row',
        marginTop: 25, 
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 80,
    },
    seemore: {
        color: constants.COLORS.GRAY,
        fontSize: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },iconContainer: {
		backgroundColor: constants.COLORS.LIGHT_GRAY,
		width: 80,
		height: 80,
		borderRadius: 80,
		justifyContent: 'center',
		alignItems: 'center',
    },
    card: {
        width: (width - 40) / 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    }
});