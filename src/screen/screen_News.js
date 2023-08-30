import {createStackNavigator} from '@react-navigation/stack';
import MediaMain from './Media/screen_MediaMain';
import MediaModal from './Media/screen_MediaModal';
import MediaDetail from './Media/screen_MediaDetail';
import {HeaderBackButton} from '@react-navigation/elements';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setSingleNews_Departments,
  wipeNews_Departments,
} from '../redux_toolkit/newsSlice';
import {setDB_Departments} from '../redux_toolkit/databaseSlice';
import {firebase} from '@react-native-firebase/database';
import axios from 'axios';

const MediaStack = createStackNavigator();

export default function News({navigation}) {
  const dispatch = useDispatch();
  const db_departments = useSelector(state => state.database.db_departments);
  const news_Departments = useSelector(state => state.news.news_Departments);
  const getSingleNews = async () => {
    await db_departments.forEach(async (value, index) => {
      var promise = await axios.get(
        'http://192.168.1.11:3100/ueldaily/cheerio',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          params: {
            url: value.data.newsLink,
          },
        },
      );
      console.log(promise.data);
      await dispatch(
        setSingleNews_Departments({
          data: promise.data,
          identifier: value.data.newsLink,
        }),
      );
    });
  };
  const getDepartmentsName = async () => {
    if (db_departments.length == 0) {
      var RNFS = require('react-native-fs');
      await firebase
        .app()
        .database(
          'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/departments')
        .once(
          'value',
          snapshot => {
            var holder = [];
            snapshot.forEach(childSnapshot => {
              let childKey = childSnapshot.key;
              let childData = childSnapshot.val();
              var logoLocation = 'departments/' + childData.logoUrl;
              RNFS.existsAssets(logoLocation).then(status => {
                if (!status) {
                  logoLocation = 'departments/default.png';
                }
                holder = [
                  ...holder,
                  {key: childKey, data: childData, logoLocation: logoLocation},
                ];
              });
            });
            setTimeout(() => {
              dispatch(setDB_Departments(holder));
            }, 0);
          },
          error => {
            console.error(error);
          },
        );
    }
  };
  useEffect(() => {
    getDepartmentsName();
  }, []);
  useEffect(() => {
    // if (db_departments.length != 0 && news_Departments.length == 0) {
    // dispatch(wipeNews_Departments());
    // getSingleNews();
    // }
  }, [db_departments]);
  return (
    <MediaStack.Navigator>
      <MediaStack.Group>
        <MediaStack.Screen
          name="MediaMain"
          options={{headerShown: false}}
          component={MediaMain}
        />
      </MediaStack.Group>
      <MediaStack.Group screenOptions={{presentation: 'modal'}}>
        <MediaStack.Screen
          name="MediaModal"
          options={{headerShown: false}}
          component={MediaModal}
        />
        <MediaStack.Screen
          name="MediaDetail"
          component={MediaDetail}
          options={({navigation, route}) => ({
            title: 'Thông tin chi tiết',
            headerLeft: props => (
              <HeaderBackButton
                {...props}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
          })}
        />
      </MediaStack.Group>
    </MediaStack.Navigator>
  );
}
