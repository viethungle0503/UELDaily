import {Button} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MediaMain from './Media/screen_MediaMain';
import MediaModal from './Media/screen_MediaModal';
import MediaDetail from './Media/screen_MediaDetail';
import { HeaderBackButton } from '@react-navigation/elements'

const MediaStack = createStackNavigator();

export default function News({ navigation }) {
  return (
    <MediaStack.Navigator>
      <MediaStack.Group>
        <MediaStack.Screen
          name="MediaMain"
          options={{ headerShown: false }}
          component={MediaMain} />
      </MediaStack.Group>
      <MediaStack.Group screenOptions={{ presentation: 'modal' }}>
        <MediaStack.Screen
          name="MediaModal"
          options={{ headerShown: false }}
          component={MediaModal} />
        <MediaStack.Screen
          name="MediaDetail"
          component={MediaDetail}
          options={({ navigation, route }) => ({
            title: 'Thông tin định mệnh',
            headerLeft: props => (
                <HeaderBackButton
                    {...props}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            )
        })}/>
      </MediaStack.Group>

    </MediaStack.Navigator>
  );
}


