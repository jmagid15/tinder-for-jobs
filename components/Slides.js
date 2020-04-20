import * as React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends React.Component {
  renderSlides() {
    return this.props.data.map((slide) => {
      return (
        <View 
          key={slide.slideIndex} 
          style={[styles.slideStyle, {backgroundColor: slide.color}]}
        >
          <Text style={styles.textStyle}>{slide.text}</Text>
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
  }
};

export default Slides;