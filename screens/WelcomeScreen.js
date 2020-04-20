import React, { Component } from 'react'
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { slideIndex: 1, text: 'Welcome to JobMatcher', color:'#03A9F4' },
    { slideIndex: 2, text: 'Use this to get a job', color: '#009688' },
    { slideIndex: 3, text: 'Set your location, then swipe away', color:'#03A9F4' }
];

class WelcomeScreen extends Component {
    onSlidesComplete = () => {
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <Slides 
                data={SLIDE_DATA}
                onComplete={this.onSlidesComplete}
            />
        );
    }
}

export default WelcomeScreen;