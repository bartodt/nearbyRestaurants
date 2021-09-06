import React, { FC } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-ratings';

type Props = {
    author_name: string
    profile_photo_url: string
    rating: number
    text: string
    relative_time_description: string
}

const Review: FC<Props> = ({ author_name, profile_photo_url, rating, text, relative_time_description }) => {
    const { borderBoxes, imageWrapper, titleContainer, title, description, ratingContainer, time } = styles


    return (<ScrollView style={borderBoxes}>
        <View style={titleContainer}>
            <Image style={imageWrapper} source={{ uri: profile_photo_url }} />
            <View>
                <Text style={title}>{author_name}</Text>
                <View style={ratingContainer}>
                    <Rating
                        startingValue={rating}
                        fractions={1}
                        imageSize={12}
                        readonly={true}
                    />
                    <Text style={time}>{relative_time_description}</Text>
                </View>
            </View>
        </View>
        <Text style={description}>{text}</Text>
    </ScrollView>)
}


const styles = StyleSheet.create({
    borderBoxes: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 5,
        shadowRadius: 20
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 3

    },
    title: {
        fontSize: 18,
        paddingLeft: 8
    },
    imageWrapper: {
        width: 40,
        height: 40
    },
    description: {
        textAlign: "justify",
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    time: {
        color: "grey",
        paddingLeft: 5
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8
    }


})
export default Review
