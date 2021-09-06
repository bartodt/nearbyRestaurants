import axios from 'axios';
import { Restaurant } from '../types';
import { default as env } from 'react-native-config';

export const getGoogleReviews = async (id: string) => {
  try {
    const response = await axios.request({
      method: 'post',
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${env.GOOGLE_API_KEY}`,
    });

    let { reviews } = response.data.result;
    return reviews;
  } catch (error: any) {
    return Promise.reject({ ...error.data });
  }
};

export const getGoogleNearbySearch = async (
  latitude: number,
  longitude: number,
) => {
  try {
    let nearbySearch = await axios.request({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&type=restaurant&rankby=distance&key=${env.GOOGLE_API_KEY}`,
    });

    const { results } = nearbySearch.data;

    let nearestRestaurants = results
      .filter((marker: Restaurant) => marker.business_status === 'OPERATIONAL')
      .slice(0, 10)
      .sort((a: Restaurant, b: Restaurant) =>
        a.rating > b.rating ? -1 : b.rating > a.rating ? 0 : 1,
      )
      .map((rest: Restaurant) =>
        rest.photos
          ? {
              ...rest,
              photo_url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&maxheight=300&photo_reference=${rest.photos[0].photo_reference}
        &key=${env.GOOGLE_API_KEY}`,
            }
          : rest,
      );
    return nearestRestaurants;
  } catch (error: any) {
    return Promise.reject({ ...error.data });
  }
};

export const getGoogleAutoComplete = async (query: string) => {
  try {
    const result = await axios.request({
      method: 'post',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${env.GOOGLE_API_KEY}`,
    });
    return result.data
  } catch (error: any) {
    console.log(error);
    return Promise.reject({ ...error.data });
  }
};

export const getGoogleLocation = async (query: string) => {
  try {
    query = query.replace(/\s/g, '+');
    const result = await axios.request({
      method: 'post',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${env.GOOGLE_API_KEY}`,
    });

    const { lat, lng } = result.data.results[0].geometry.location;

    return { latitude: lat, longitude: lng };
  } catch (error: any) {
    console.log(error);
    return Promise.reject({ ...error.data });
  }
};
