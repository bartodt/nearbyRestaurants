import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { PredictionType } from '../types'


type PredictionProps = {
    predictions: PredictionType[]
    onPredictionTapped: (placeId: string, description: string) => void
}


const Predictions: FunctionComponent<PredictionProps> = ({ predictions, onPredictionTapped }) => {
    const { predictionsContainer, predictionRow } = styles

    const renderItem = ({ item }: { item: PredictionType }) => {
        return (
            <TouchableOpacity
                style={predictionRow}
                onPress={() => onPredictionTapped(item.place_id, item.description)}
            >
                <Text numberOfLines={1}>
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
            style={[predictionsContainer]}
        />
    )
}

const styles = StyleSheet.create({
    predictionsContainer: {
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderRadius: 5,
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    predictionRow: {
        paddingBottom: 20,
        borderBottomColor: 'black',
        
    }
})

export default Predictions