import React, { FC, ReactElement } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RestaurantCard } from '../../types';
import { Rating } from 'react-native-ratings';


type Props = RestaurantCard

export const Card: FC<Props> = ({
    photo_url,
    icon,
    name,
    rating,
    user_ratings_total,
    vicinity,
    action
}): ReactElement => {

    const { cardContainer, container, image, opacityCover, header, logo, title, content, description, reviews, reviewContainer } = styles
    return (
        <View style={cardContainer}>

            <TouchableOpacity style={container} onPress={action}>
                {photo_url && <Image style={image}
                    source={{ uri: photo_url }}
                />}
                <View />
                <View style={opacityCover}>
                    <View style={header}>
                        <Image style={logo} source={{ uri: icon }} />
                        <Text style={title}>{name}</Text>
                    </View>
                    <View style={content}>
                        <Text style={description}>{vicinity}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={reviewContainer}>
                <Rating
                    startingValue={rating}
                    fractions={1}
                    imageSize={16}
                    readonly={true}
                    tintColor="white"

                />
                {user_ratings_total && <Text>{` (${user_ratings_total})`}</Text>}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 5
    },
    container: {
        backgroundColor: "#3c3c3c",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        marginBottom: 5,
        borderRadius: 10,
        minHeight: 175,
        marginTop: 10,
        width: "85%",
        marginLeft: "auto",
        marginRight: "auto",
        elevation: 4,
        shadowOffset: { width: 50, height: 50 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    image: {
        height: 175,
        width: '100%',
        flex: 1,
        position: "absolute",
        opacity: 0.8,
        resizeMode: "cover"

    },
    opacityCover: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 0
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        padding: 5
    },
    logo: {
        borderRadius: 15,
        height: 45,
        width: 45,

    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        left: 15,
        flexWrap: "wrap",
        flex: 1
    },
    content: {
        flexDirection: "column",
        alignItems: "center"
    },
    description: {
        color: "white",
        fontSize: 16,
        marginBottom: 16,
        minWidth: "100%",
        padding: 6,
        paddingHorizontal: 12

    },
    reviews: {
        color: "white",
        fontSize: 16,
        width: "100%",
        padding: 8,
        position: "absolute",
        bottom: 8
    },
    reviewContainer:
    {
        flexDirection: "row", flex: 1, marginLeft: "auto", marginRight: "auto", alignItems: "center"
    }
});
