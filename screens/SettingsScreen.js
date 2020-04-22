import React, { Component } from 'react';
import { View, Button, AsyncStorage } from 'react-native';

class SettingsScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
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

export default SettingsScreen;