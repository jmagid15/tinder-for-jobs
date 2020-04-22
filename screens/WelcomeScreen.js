import _ from 'lodash';
import React, { Component } from 'react'
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import Slides from '../components/Slides';

const SLIDE_DATA = [
    { slideIndex: 1, text: 'Welcome to JobMatcher', color:'#03A9F4' },
    { slideIndex: 2, text: 'Use this to get a job', color: '#009688' },
    { slideIndex: 3, text: 'Set your location, then swipe away', color:'#03A9F4' }
];

class WelcomeScreen extends Component {
    state = { token: null };

    async componentDidMount() {
        
        let token = await AsyncStorage.getItem('fb_token');

        if (token) {
            this.props.navigation.navigate('Main', { screen: 'Map' });
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('Auth');
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading />;
        }

        return (
            <Slides 
                data={SLIDE_DATA}
                onComplete={this.onSlidesComplete}
            />
        );
    }
}

export default WelcomeScreen;