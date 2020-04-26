import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "space-around"}}>
                <Button
                    title="Reset Liked Jobs"
                    large
                    icon={{ name: 'delete-forever' }}
                    buttonStyle={{ backgroundColor: "#F44336" }}
                    onPress={this.props.clearLikedJobs}
                />
                <Button 
                    title="Logout"
                    onPress={() => {
                        // ~TEST~ Clear the fb token for debugging/ testing
                        AsyncStorage.removeItem('fb_token');
                    }}
                />
            </View>
        );
    }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);
