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

export default function Home() {
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
          title: 'Thời khoá biểu',
        }}
      />
      <HomeStack.Screen
        name="ScoreBoard"
        component={ScoreBoard}
        options={{
          title: 'Xem điểm',
        }}
      />
      <HomeStack.Screen
        name="Exam"
        component={Exam}
        options={{ title: 'Lịch thi' }}
      />
      <HomeStack.Screen
        name="Ctxh"
        component={Ctxh}
        options={{ title: 'Kiểm tra ngày CTXH' }}
      />
      <HomeStack.Screen
        name="Homework"
        component={Homework}
        options={({ navigation, route }) => ({
          title: 'Bài tập LMS',
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
                  navigation.goBack();
                }

              }}
            />
          )
        })}
      />
      <HomeStack.Screen
        name="Tuition"
        component={Tuition}
        options={{ title: 'Học phí' }}
      />
      <HomeStack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ title: 'Thông tin chi tiết' }}
      />
    </HomeStack.Navigator>
  );
}


