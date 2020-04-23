import React, { Component } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class MapScreen extends Component {
  state = {
    region: {
      longitude: -122,
      latitude: 37.5,
      latitudeDelta: 0.4,
      longitudeDelta: 
        Dimensions.get("window").width / Dimensions.get("window").height * 0.4
    }
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView 
          region={this.state.region}
          style={{ flex: 1 }} 
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
      </View>
    );
  }
}

export default MapScreen;