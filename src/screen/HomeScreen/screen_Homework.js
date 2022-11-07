import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Table,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {getInformation} from '../../redux/actions';
import {useEffect} from 'react';

export default function Homework() {
  // const dispatch = useDispatch();
  // const information = useSelector(state => state.userReducer);
  // useEffect(() => {
  //     dispatch(getInformation);
  // },[]);
  const [tableData, settableDate] = useState([]);
  useEffect(() => {
    firebase
      .app()
      .database(
        'https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app',
      )
      .ref('/users')
      .once('value', snapshot => {
        let records = [];
        snapshot.forEach(childSnapshot => {
          let childKey = childSnapshot.key;
          // console.log(childKey)
          let childData = childSnapshot.val();
          // console.log(childData)
          records.push({key: childKey, data: childData});
          // console.log(records)
        });
        settableDate(records);
      });
    // console.log(tableData);
  }, []);
  return (
    <>
      <Text>dd</Text>
      {/* <FlatList
                data={information}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.key}s</Text>
                        <Text>{item.email}s</Text>
                        <Text>{item.fullName}d</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()} /> */}
      <FlatList
        data={tableData}
        renderItem={({item}) => (
          <View>
            <Text>{item.key}s</Text>
            <Text>{item.data.email}</Text>
            <Text>{item.data.fullName}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text>dd</Text>
    </>
  );
}
