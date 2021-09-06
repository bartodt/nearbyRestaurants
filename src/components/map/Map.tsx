import axios from 'axios';
import React, { useState, useEffect, FC } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PredictionType, Region, Restaurant } from '../../types';
import SearchBar from './SearchBar';
import Geolocation from '@react-native-community/geolocation';
import Predictions from './Predictions';
import { getList, setList } from '../../app/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { check, request, PERMISSIONS, RESULTS, Permission as RNPermission } from 'react-native-permissions';
import { useHeaderHeight } from '@react-navigation/elements';
import { getGoogleAutoComplete, getGoogleLocation, getGoogleNearbySearch } from '../../services';
import ICONS from "../../assets"
import Svg, { Path } from 'react-native-svg';
interface OwnProps {
  navigation: any;
}

type Props = OwnProps;


const Map: FC<Props> = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
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
    const moveMapToCoordenates = async () => {
      try {
        const nearbyPlaces = await getGoogleNearbySearch(region.latitude, region.longitude)
        await dispatch(setList(nearbyPlaces))
      } catch (error: any) {
        Alert.alert("Error", error)
      }

    }

    moveMapToCoordenates();
  }, [region.latitude || region.longitude])



  const onChangeText = async (text: string) => {
    setSearch(text)
    try {
      const result = await getGoogleAutoComplete(text)
      if (result) {
        const { predictions } = result.data
        setPredictions(predictions)
      }
    } catch (error: any) {
      Alert.alert("Error", error)
    }
  }



  const onPredictionTapped = async (description: string) => {
    try {
      const result = await getGoogleLocation(description) // returns {lat, lng}
      if (result) {
        setSearch(description)
        setPressedPrediction(true)
        setRegion({ ...region, ...result })
      }

    } catch (error: any) {
      Alert.alert("Error", error)
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
        { enableHighAccuracy: true, timeout: 15000 }
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

  const clearText = () => {
    setSearch("")
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
      >
        {markers.length > 0 && markers.map((marker: Restaurant, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.geometry.location.lat, longitude: marker.geometry.location.lng }}
            title={marker.name}
            pinColor={"#ff467b"}
          />
        )

        )}

      </MapView>

      <View style={[container, { minHeight: Dimensions.get("window").height - headerHeight }]}>
        <SearchBar
          value={search}
          onChangeText={(text) => {
            onChangeText(text)
          }}
          clearText={clearText}
        />
        {predictions.length > 0 && <Predictions predictions={predictions} onPredictionTapped={onPredictionTapped} />}

        <TouchableOpacity
          onPress={findGPSCoordinates}
          style={locationContainer}>
          <Svg style={locationIcon} viewBox={ICONS["location"].viewBox}>
            <Path
              fill="#111d5e"
              d={ICONS["location"].primary}
            />
          </Svg>
        </TouchableOpacity>
      </View>
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
    width: 60, height: 60,
    bottom: 80, right: 20,
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center"
  },
  locationIcon: {
    flex: 1, height: 32, width: 32, marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "auto"
  }
});


export default Map