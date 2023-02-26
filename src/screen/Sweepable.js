import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PreLogin1 from "./screen_PreLogin1";
import PreLogin2 from "./screen_PreLogin2";
import Login from "./screen_Login";

const SweepableScreens = createMaterialTopTabNavigator();
export default function Sweepable() {
  return (
    <SweepableScreens.Navigator
      tabBarPosition='bottom'
      swipeEnabled='true'
      tabBarOptions={
        style = { display: "none" }
      }
      initialRouteName="PreLgin1">
      <SweepableScreens.Screen
        name="PreLogin1"
        component={PreLogin1}
        options={{ headerShown: false }}
      />
      <SweepableScreens.Screen
        name="PreLogin2"
        component={PreLogin2}
        options={{ headerShown: false }}
      />
      <SweepableScreens.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </SweepableScreens.Navigator>
  )
}