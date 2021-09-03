import React, { FunctionComponent } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


type SearchBarProps = {
  value: string
  onChangeText: (text: string) => void
}

const SearchBar: FunctionComponent<SearchBarProps> = ({ value, onChangeText }) => {
  const { container, inputStyle } = styles

  return (
    <ScrollView style={container}>
      <TextInput
        style={[inputStyle]}
        placeholder='Where do you want to eat?'
        placeholderTextColor='gray'
        value={value}
        onChangeText={onChangeText}
        returnKeyType='search'
      />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "95%",
    borderRadius: 10,
    height: "20%"

  },
  inputStyle: {
    width: "100%",
    borderRadius: 10,
    color: 'black',
    borderColor: '#666',
    backgroundColor: '#FFF',
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
    opacity: 1,
  },
})
export default SearchBar