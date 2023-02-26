import { createStackNavigator } from '@react-navigation/stack';
import ProfileDisplay from './Profile/screen_ProfileDisplay';
import PersonalInformation from './Profile/screen_PersonalInformation';
import NullDataScreen from '../components/nullDataScreen';
import strings from './Language';

const ProfileStack = createStackNavigator();
export default function Profile() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileDisplay"
        component={ProfileDisplay}
        options={{ headerShown: false }} />
      <ProfileStack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{ headerShown: false }} 
        screenOptions={{ presentation: 'modal' }}/>
        <ProfileStack.Screen
        name="NullDataScreen"
        component={NullDataScreen}
        options={{ headerShown: true,
        title:strings.no_data }} 
        screenOptions={{ presentation: 'modal' }}/>
    </ProfileStack.Navigator>
  );
}
