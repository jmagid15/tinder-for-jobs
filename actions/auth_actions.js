import { AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

// AsyncStorage.setItem('fb_token', token)
// AsyncStorage.getItem('fb_token')

export const facebookLogin = () => {
    return async (dispatch) => {
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            // Dispatch action saying FB login is done
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
        } else {
            // Start up FB Login process
            doFacebookLogin(dispatch);
        }
    }
};

const doFacebookLogin = async (dispatch) => {
  await Facebook.initializeAsync('227064488569924');
  let { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile'],
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);

  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
};
