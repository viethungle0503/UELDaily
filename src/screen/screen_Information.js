import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// import component
import AllNotices from './Notices/screen_AllNotices';
import WarningNotices from './Notices/screen_WarningNotices';
import UpdateNotices from './Notices/screen_UpdateNotices';

const Tab = createMaterialTopTabNavigator();

export default function Information({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="AllNotices"
      screenOptions={{
        tabBarActiveTintColor: '#0065FF',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
          // backgroundColor: {Focused ? backgroundColor :"white" : backgroundColor: '#F7F9FE'},
        },
        tabBarStyle: {
          backgroundColor: '#F7F9FE',
          paddingVertical: 0,
          textTransform: 'capitalize',
        },
        tabBarPressColor: '#0065FF',
      }}>
      <Tab.Screen
        style={styles.notiHeader_Sort_btnActive}
        name="AllNotices"
        component={AllNotices}
        options={{
          tabBarLabel: 'Tất cả',
          upperCaseLabel: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WarningNotices"
        component={WarningNotices}
        options={{tabBarLabel: 'Nhắc nhở', headerShown: false}}
      />
      <Tab.Screen
        name="UpdateNotices"
        component={UpdateNotices}
        options={{tabBarLabel: 'Cập nhật', headerShown: false}}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 14,
    paddingTop: 14,
    marginBottom: 50, 
  },
  fixItem: {
    position: 'relative',
    top: 0,
  },

  noti: {
    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 200,

    marginVertical: 20,
    backgroundColor: '#F7F9FE',
    borderRadius: 10,
  },
  notiItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,

    marginBottom: 2,

    shadowColor: 'rgb(0, 101, 255)',
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,

    elevation: 2,

    position: 'relative',
  },
  fadeItem: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    zIndex: 1,
  },

  notiItem_Icon: {
    flex: 1,
    paddingTop: 2,
  },
  notiItem_Content: {
    flex: 6,
    paddingLeft: 6,
  },
  notiItem_Status: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  notiItem_Content_Title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#080B09',
  },
  notiItem_Content_Action: {
    paddingTop: 5,
  },

  notiItem_Status_ReadIcon: {
    opacity: 1,
    width: 10,
    height: 10,

    borderRadius: 100,
  },

  notiHeader_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    paddingVertical: 5,
  },
  notiHeader_Sort: {
    backgroundColor: '#F7F9FE',
    borderRadius: 10,
  },
  notiHeader_Sort_btnActive: {
    width: '33%',
    // alignSelf: 'stretch',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#0065FF',

    shadowColor: 'rgb(51, 132, 255)',
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,

    elevation: 2,
  },
  notiHeader_Sort_btnNotPress: {
    width: '33%',
    // alignSelf: 'stretch',

    justifyContent: 'center',
    alignItems: 'center',
  },

  effect: {
    position: 'absolute',
    right: 0,
    top: 0,

    zIndex: 2,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'space-around',
  },
  row: {
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',

    // alignContent: 'flex-end',
    // marginTop: 12,
    // marginRight: 10,
    // overflow: 'hidden'
  },
});
