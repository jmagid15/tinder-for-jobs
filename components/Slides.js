import * as React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends React.Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button 
          title="Onwards!"
          raised
          buttonStyle={styles.buttonStyle}
          containerStyle={{marginTop: 15}}
          onPress={this.props.onComplete}
        />
      )
    }
  }

  renderSlides() {
    return this.props.data.map((slide, i) => {
      return (
        <View 
          key={slide.slideIndex} 
          style={[styles.slideStyle, {backgroundColor: slide.color}]}
        >
          <Text style={styles.textStyle}>{slide.text}</Text>
          {this.renderLastSlide(i)}
        </View> 
      )
    });
  }

  render() {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    )
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
  }
};

export default Slides;