import React, { FC, ReactElement } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Restaurant } from '../../types';


type Props = Restaurant

export const Card: FC<Props> = ({
    photo_url,
    icon,
    name,
    rating,
    user_ratings_total,
    vicinity,
    action
}): ReactElement => {

    const renderReviews = () => {
        if (rating && user_ratings_total) {
            return (
                <Text style={reviews}> {`Rating: ${rating} (${user_ratings_total})`}</Text>
            )
        }
        if (rating) return (
            <Text style={reviews}> {`Rating: ${rating}`}</Text>
        )
        else return

    }

    const { container, image, opacityCover, header, logo, title, content, description, reviews, status } = styles
    return (
        <TouchableOpacity style={container} onPress={action}>
            {photo_url && <Image style={image}
                source={{ uri: photo_url}}
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
            {renderReviews()}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        marginBottom: 5,
        borderColor: "#666",
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 175,
        marginTop: 10,
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    image: {
        height: 175,
        width: '100%',
        flex: 1,
        position: "absolute",
        opacity: 0.6,

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
        borderRadius: 50,
        height: 55,
        width: 55,
        opacity: 1
    },
    title: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        left: 24,
        flexWrap: "wrap",
        flex: 1
    },
    content: {
        flexDirection: "column",
        alignItems: "center"
    },
    description: {
        color: "black",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 16,
        minWidth: "100%",
        padding: 6
    },
    reviews: {
        color: "black",
        fontSize: 12,
        fontWeight: "bold",
        width: "100%",
        padding: 8,
        position: "absolute",
        bottom: 8
    },
    status: {
        position: "absolute",
        right: -24,
        top: 26,
        width: "30%",
        zIndex: 99,
        color: "white",
        backgroundColor: "black",
        fontSize: 8,
        textAlign: "center",
        fontWeight: "normal",
        transform: [{ rotate: '45deg' }]
    }
});
