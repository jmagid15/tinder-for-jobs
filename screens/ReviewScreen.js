import * as React from 'react'
import { View, Text, Button } from 'react-native'

const ReviewScreen = ({navigation}) => {
  return (
    <View>
      <Text>Review Screen Boii</Text>
      <Text>Review Screen Boii</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

export default ReviewScreen;