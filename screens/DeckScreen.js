import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
  renderCard = (job) => {
    const initialRegion = {
      longitude: Number(job.restaurant.location.longitude),
      latitude: Number(job.restaurant.location.latitude),
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    }

    return (
      <Card title={job.restaurant.name}>
        <View style={{ height: 300 }}>
          <MapView 
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={true}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.restaurant.cuisines}</Text>
          <Text>{job.restaurant.user_rating.aggregate_rating}</Text>
        </View>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Restaurants">
        <Button 
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          buttonStyle={{ backgroundColor: "#03A9F4" }}
          onPress={() => this.props.navigation.navigate('Map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <Swipe
          data={this.props.jobs} 
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
          keyProp="id"
        />
      </View>
    );
    }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
}

function mapStateToProps ({ jobs }) {
  return { jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);
