import React, { FunctionComponent, useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  ViewStyle
} from 'react-native'
import { PredictionType } from '../types'
import Predictions from './Predictions'


type SearchBarProps = {
  value: string
  onChangeText: (text: string) => void
  predictions: PredictionType[]
  onPredictionTapped: (placeId: string, description: string) => void
}

const SearchBar: FunctionComponent<SearchBarProps> = ({ value, onChangeText, predictions, onPredictionTapped }) => {
  const { container, inputStyle } = styles

  return (
    <View style={container}>
      <TextInput
        style={[inputStyle]}
        placeholder='Where do you want to eat?'
        placeholderTextColor='gray'
        value={value}
        onChangeText={onChangeText}
        returnKeyType='search'
      />
      {predictions.length > 0 && <Predictions predictions={predictions} onPredictionTapped={onPredictionTapped} />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
  },
  inputStyle: {
    borderRadius: 10,
    margin: 10,
    color: '#000',
    borderColor: '#666',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  },
})
export default SearchBar