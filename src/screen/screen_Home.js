import { createStackNavigator } from '@react-navigation/stack';
import Ctxh from './HomeScreen/screen_Ctxh';
import NewsDetail from './HomeScreen/screen_NewsDetail';
import Exam from './HomeScreen/screen_Exam';
import HomeDisplay from './HomeScreen/screen_HomeDisplay';
import Tuition from './HomeScreen/screen_Tuition';
import Homework from './HomeScreen/screen_Homework';
import ScoreBoard from './HomeScreen/screen_ScoreBoard';
import Schedule from './HomeScreen/screen_Schedule';
import { HeaderBackButton } from '@react-navigation/elements';
import strings from './Language';

const HomeStack = createStackNavigator();

export default function Home({navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeDisplay"
        component={HomeDisplay}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Schedule"
        component={Schedule}
        options={{
          title: strings.schedule,
        }}
      />
      <HomeStack.Screen
        name="ScoreBoard"
        component={ScoreBoard}
        options={{
          title: strings.scoreboard,
        }}
      />
      <HomeStack.Screen
        name="Exam"
        component={Exam}
        options={{ title: strings.exam }}
      />
      <HomeStack.Screen
        name="Ctxh"
        component={Ctxh}
        options={{ title: strings.ctxh }}
      />
      <HomeStack.Screen
        name="Homework"
        component={Homework}
        options={({ navigation, route }) => ({
          title: strings.homework,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (route.params == undefined) {
                  var initBy = ""
                }
                else {
                  var { initBy } = route.params;
                }
                if (initBy != "") {
                  navigation.goBack();
                  navigation.navigate(initBy);
                }
                else {
                  navigation.navigate("HomeDisplay");
                }

              }}
            />
          )
        })}
      />
      <HomeStack.Screen
        name="Tuition"
        component={Tuition}
        options={{ title: strings.tuition }}
      />
      <HomeStack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ headerShown:false }}
      />
    </HomeStack.Navigator>
  );
}


