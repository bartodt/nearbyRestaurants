import axios from 'axios';
import React, { useState, useEffect, FC } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PredictionType, Region, Restaurant } from '../../types';
import SearchBar from './SearchBar';
import { default as env } from 'react-native-config';
import Geolocation from '@react-native-community/geolocation';
import Predictions from './Predictions';
import { getList, setList } from '../../app/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { check, request, PERMISSIONS, RESULTS, Permission as RNPermission } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/core';

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'
interface OwnProps {
  navigation: any;
}

type Props = OwnProps;

const Map: FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState<string>("")
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  })
  const [predictions, setPredictions] = useState<PredictionType[]>([])
  const [pressedPrediction, setPressedPrediction] = useState<boolean>(false)
  const markers = useSelector(getList)
  const dispatch = useDispatch()



  useEffect(() => {
    if (search.trim() === '' || pressedPrediction) {
      setPredictions([])
    }
  }, [search, pressedPrediction])


  useEffect(() => {
    findGPSCoordinates()
  }, [])

  useEffect(() => {

  })

  useEffect(() => {
    const moveMapToCoordenates = async () => {
      let nearbySearch = await axios.request({
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&type=restaurant&rankby=distance&key=${env.GOOGLE_API_KEY}`,
      })

      const { data: { results } } = nearbySearch

      let nearestRestaurants = results.filter((marker: Restaurant) => (marker.business_status === "OPERATIONAL")).slice(0, 10).sort((a: Restaurant, b: Restaurant) => (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0)).map((rest: Restaurant) =>
        rest.photos ? {
          ...rest, photo_url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=250&maxheight=250&photo_reference=${rest.photos[0].photo_reference}
    &key=${env.GOOGLE_API_KEY}`
        } : rest
      )

      console.log(nearestRestaurants)

      await dispatch(setList(nearestRestaurants))
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


  const findGPSCoordinates = async () => {
    let granted = Platform.OS == 'android' ?
      await requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      : await requestPermission(PERMISSIONS.IOS.LOCATION_ALWAYS)

    if (!granted) return Alert.alert("Access denied", "Please, allow access to your location in order to show you the nerest restaurants")

    else {
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
    }
  };


  const requestPermission = async (permission: RNPermission): Promise<boolean> => {
    try {
      const checkResult = await check(permission)
      if (checkResult == RESULTS.GRANTED) {
        return true
      }
      const reqResult = await request(permission)
      return reqResult == RESULTS.GRANTED // also exists 'limited' for some permissions
    } catch (err) {
      console.warn(err);
      return false
    }
  }

  const goToListDetail = () => {
    navigation.navigate("RestaurantList")
  }

  const { container, map, locationIcon, locationContainer } = styles
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MapView
        style={map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={region}
        initialRegion={region}
      >
        {markers.length > 0 && markers.map((marker: Restaurant, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.geometry.location.lat, longitude: marker.geometry.location.lng }}
            title={marker.name}
            pinColor={marker.opening_hours?.open_now ? "#FF0000" : "#A0A0A0"}
          />
        )

        )}
      </MapView>
      <View style={container}>
        <SearchBar
          value={search}
          onChangeText={(text) => {
            onChangeText(text)
          }}
        />
        {predictions.length > 0 && <Predictions predictions={predictions} onPredictionTapped={onPredictionTapped} />}

      </View>

      <TouchableOpacity
        onPress={goToListDetail}
        style={locationIcon}>

      </TouchableOpacity>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', top: 10, width: '100%', alignItems: "center"
  },
  map: {
    flex: 1
  },
  body: {
    paddingHorizontal: 20
  },
  locationContainer: {
    backgroundColor: 'transparent',
    width: 20
  },
  locationIcon: {
    backgroundColor: "blue",
    width: 40,
    height: 40,
    flex: 1,
  }
});


export default Map