import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { PredictionType } from '../../types'


type PredictionProps = {
    predictions: PredictionType[]
    onPredictionTapped: (placeId: string, description: string) => void
}


const Predictions: FunctionComponent<PredictionProps> = ({ predictions, onPredictionTapped }) => {
    const { predictionsContainer, predictionRow, text } = styles

    const renderItem = ({ item }: { item: PredictionType }) => {
        return (
            <TouchableOpacity
                style={predictionRow}
                onPress={() => onPredictionTapped(item.place_id, item.description)}
            >
                <Text style={text} numberOfLines={1}>
                    {item.description}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={predictions}
            renderItem={renderItem}
            keyExtractor={(item) => item.place_id}
            keyboardShouldPersistTaps='handled'
            style={[predictionsContainer, predictions.length === 1 ? null : {bottom: 5}]}
        />
    )
}

const styles = StyleSheet.create({
    predictionsContainer: {
        backgroundColor: 'white',
        width: "95%",
        opacity: 0.8,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    predictionRow: {
        width: "95%",
        paddingBottom: 10,
        paddingTop: 10,
        marginLeft: 10,
        marginRight: "auto",
        borderBottomWidth: 0.3,
    },
    text: {
        fontStyle: "italic"
    }
})

export default Predictions