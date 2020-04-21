import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions'; 

class AuthScreen extends Component {
    componentDidMount() {
        this.props.facebookLogin();

        // ~TEST~ Clear the fb token for debugging/ testing
        //AsyncStorage.removeItem('fb_token');

        this.onAuthComplete(this.props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.token !== prevProps.token) {
              this.onAuthComplete(this.props);
        }
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('Main', { screen: 'Map' })
        }
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <ActivityIndicator size="large" color="#007aff" />
            </View>
        );
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
