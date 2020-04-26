import axios from 'axios';
import qs from 'qs';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { 
  GOOGLE_API_KEY, 
  INDEED_PUBLISHER_API_KEY,
  ZOMATO_API_KEY
} from '../creds';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'https://developers.zomato.com/api/v2.1/geocode?';
const JOB_QUERY_PARAMS = {
  publisher: INDEED_PUBLISHER_API_KEY,
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript' // Job Search Term
};

const translateLatLongToZip = async (region) => {
  // Ensure current location can be accessed
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  const { latitude, longitude } = region;

  // Use Google geolocation API
  Location.setApiKey(GOOGLE_API_KEY);
  const address = await Location.reverseGeocodeAsync({ latitude, longitude })
  return address[0].postalCode;
};

const buildJobsUrl = (lat, long) => {
  const query = qs.stringify({lat: lat, lon: long});
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, navigateCallback) => {
  return async (dispatch) => {
    try {
      // ~~ [If Indeed could be used] ~~
      // If we were using zip instead of lat long
      // let zip = await translateLatLongToZip(region);

      const url = buildJobsUrl(region.latitude, region.longitude)
      let { data } = await axios({ 
        method: 'get', 
        url, 
        headers: { 'user-key': ZOMATO_API_KEY }
      });
      dispatch({ type: FETCH_JOBS, payload: data.nearby_restaurants });
      navigateCallback();
    } catch(e) {
      console.error(e);
    }
  };
};

export const likeJob = (job) => {
  return {
    payload: job.restaurant,
    type: LIKE_JOB
  }
}

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOBS
  }
}
