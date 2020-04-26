import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-elements';
import { Linking } from 'expo';
import MapView from 'react-native-maps';

class ReviewScreen extends Component {
  renderLikedJobs = () => {
    return this.props.likedJobs.map(job => {
      const { name, cuisines, menu_url, id, currency, average_cost_for_two } = job;
      const initialRegion = {
        longitude: Number(job.location.longitude),
        latitude: Number(job.location.latitude),
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      }

      return (
        <Card title={name} key={id}>
          <View style={{ height: 200 }}>
            <MapView 
              scrollEnabled={false}
              style={{ flex: 1 }}
              cacheEnabled={true}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{`${currency}${average_cost_for_two}`}</Text>
              <Text style={styles.italics}>{cuisines}</Text>
            </View>
            <Button
              title="See Menu"
              buttonStyle= {{ backgroundColor: "#03A9F4" }}
              onPress={() => Linking.openURL(menu_url)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
