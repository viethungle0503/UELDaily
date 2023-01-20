import { createStackNavigator } from '@react-navigation/stack';
import ProfileDisplay from './Profile/screen_ProfileDisplay';
import PersonalInformation from './Profile/screen_PersonalInformation';
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
    </ProfileStack.Navigator>
  );
}
