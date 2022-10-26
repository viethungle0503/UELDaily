import { createStackNavigator } from '@react-navigation/stack';
import Exam from './screen_Exam';
import HomeDisplay from './screen_HomeDisplay';
import Tuition from './screen_Tuition'
import Homework from './screen_Homework'
import ScoreBoard from './screen_ScoreBoard'
import Schedule from './screen_Schedule'

const HomeStack = createStackNavigator();  

export default function Home() {
  
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='HomeDisplay' component={HomeDisplay} options={{headerShown:false}}/>
      <HomeStack.Screen name='Schedule' component={Schedule}/>
      <HomeStack.Screen name='ScoreBoard' component={ScoreBoard}/>
      <HomeStack.Screen name='Exam' component={Exam} options={{headerShown:false}}/>
      <HomeStack.Screen name='Homework' component={Homework}/>
      <HomeStack.Screen name='Tuition' component={Tuition}/>
    </HomeStack.Navigator>
);};

