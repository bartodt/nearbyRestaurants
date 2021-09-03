import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PredictionType, Region, Restaurant } from '../types';
import SearchBar from './SearchBar';
import { default as env } from 'react-native-config';
import Geolocation from '@react-native-community/geolocation';

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'


export function Map() {
  const [search, setSearch] = useState<string>("")
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  }) // Default city: Buenos Aires
  const [predictions, setPredictions] = useState<PredictionType[]>([])
  const [pressedPrediction, setPressedPrediction] = useState<boolean>(false)
  const [markers, setMarkers] = useState<Restaurant[]>([])
  const { container, body, map } = styles

  useEffect(() => {
    if (search.trim() === '' || pressedPrediction) {
      setPredictions([])
    }
  }, [search, pressedPrediction])


  useEffect(() => {
    requestLocationPermission()
  }, [])

  useEffect(() => {
    const moveMapToCoordenates = async () => {
      let nearbySearch = await axios.request({
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&type=restaurant&rankby=distance&key=${env.GOOGLE_API_KEY}`,
      })

      const { data: { results } } = nearbySearch

      let nearestRestaurants = results.filter((marker: Restaurant) => (marker.business_status === "OPERATIONAL")).slice(0, 10).sort((a: Restaurant, b: Restaurant) => (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0))

      setMarkers(nearestRestaurants)
    }

    moveMapToCoordenates();
  }, [region.latitude || region.longitude])

  const onChangeText = async (text: string) => {
    setSearch(text)
    try {
      const result = await axios.request({
        method: 'post',
        url: `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${env.GOOGLE_API_KEY}&input=${text}`
      })
      if (result) {
        const { predictions } = result.data
        setPredictions(predictions)
      }
    } catch (error) {
      console.log(error)
    }
  }



  const onPredictionTapped = async (placeId: string, description: string) => {
    try {
      let query = description.replace(/\s/g, "+")
      const result = await axios.request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${env.GOOGLE_API_KEY}`
      })

      if (result) {
        const { lat, lng } = result.data.results[0].geometry.location
        pressedPrediction
        setSearch(description)
        setPressedPrediction(true)
        setRegion({ ...region, latitude: lat, longitude: lng })
      }

    } catch (error) {
      console.log(error)
    }
  }


  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        findCoordinates()
      } else {
        console.log("Location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  
  const findCoordinates = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setRegion({ ...region, latitude, longitude })
      },
      (error) => {
        Alert.alert("We couldn't access your location.", "Please, turn on your location in order to show you the nearest restaurants.")
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={region}
        initialRegion={region}
      >
        {markers.length > 0 && markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.geometry.location.lat, longitude: marker.geometry.location.lng }}
            title={marker.name}
            pinColor={marker.opening_hours?.open_now ? "#FF0000" : "#A0A0A0"}
          />
        )

        )}
      </MapView>
      <SafeAreaView style={container}>
        <View style={container}>

          <SearchBar
            value={search}
            onChangeText={(text) => {
              onChangeText(text)
            }}
            predictions={predictions}
            onPredictionTapped={onPredictionTapped}
          />


          <TouchableOpacity
            onPress={requestLocationPermission}
            style={{
              width: 60, height: 60, position: "relative",
              bottom: 20, right: 20, borderRadius: 30, backgroundColor: "black"
            }}>

          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', top: 10, width: '100%'
  },
  map: {
    width: "50%",
    height: "50%",
  },
  body: {
    paddingHorizontal: 20
  }
});