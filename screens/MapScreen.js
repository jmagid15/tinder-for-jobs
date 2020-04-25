import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import * as actions from '../actions';

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

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('Main', { screen: 'Deck' })
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView 
          region={this.state.region}
          style={{ flex: 1 }} 
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button 
            large
            title="Search this area"
            buttonStyle={{ backgroundColor: "#009688" }}
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 70,
    right: 70
  }
}

export default connect(null, actions)(MapScreen);
