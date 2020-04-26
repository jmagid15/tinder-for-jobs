import React, { Component } from "react";
import { 
    View, 
    Animated, 
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager, 
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ROTATE_CONST = 1.9;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: 'id'
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ 
          x: gesture.dx, 
          y: gesture.dy 
        })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetCardPosition();
        }
      }
    });

    this.state = { 
      panResponder, 
      position, 
      index: 0 
    };
  }

  componentDidUpdate() {
    // For Android
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

    LayoutAnimation.spring();
  }

  forceSwipe(swipeDir) {
    const x = swipeDir === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      this.onSwipeComplete(swipeDir);
    });
  }

  onSwipeComplete(swipeDir) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];
    swipeDir === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

    // Increment card index
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetCardPosition() {
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0}
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * ROTATE_CONST, 0, SCREEN_WIDTH * ROTATE_CONST],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...this.state.position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((item, idx) => {
      if (idx < this.state.index) {
        return null;
      }

      if (idx === this.state.index) {
        return (
          <Animated.View
            style = {[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {...this.state.panResponder.panHandlers}
            key={item.restaurant[this.props.keyProp]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View 
          key={item.restaurant[this.props.keyProp]}
          style={[styles.cardStyle, { top: 10 * (idx - this.state.index), zIndex: -idx }]}
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  }
}

export default Swipe;
