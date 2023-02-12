import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import styles from './HomeScreenStyles/screen_Schedule_style';
import strings from '../Language';
import { useSelector, useDispatch } from 'react-redux';
import { setSchedule } from '../../redux_toolkit/userSlice';
import post_data from '../UEL';
import { countPropertiesMethod2 } from '../GlobalFunction';


LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1 ',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    '1 ',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: "Hôm nay",
};
LocaleConfig.locales['en'] = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: "Today",
  // numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] // number localization example
};
function getToday() {
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  return year + '-' + month + '-' + date;
}
function minDate(weeks = 2) {
  var today = new Date();
  var timestamp = today.getTime() - (weeks * 24 * 60 * 60 * 1000 * 7);
  today = new Date(timestamp);
  return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}
function maxDate(weeks = 2) {
  var today = new Date();
  var timestamp = today.getTime() + (weeks * 24 * 60 * 60 * 1000 * 7);
  today = new Date(timestamp);
  return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}
function objectLength(obj) {
  var result = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // or Object.prototype.hasOwnProperty.call(obj, prop)
      result++;
    }
  }
  return result;
}

export default function Schedule() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const schedule = useSelector(state => state.user.schedule);
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleHolder, setScheduleHolder] = useState({});
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const renderItem = (module) => {
    return (
      <View style={[styles.itemContainer, { height: module.height }]}>
        <Card style={styles.item}>
          <Card.Content>
            <View>
              <Text style={styles.courseName}>
                {module.courseName}
              </Text>
              <View style={styles.textLine}>
                <Text style={styles.textLabel}>{strings.time}</Text>
                <Text style={styles.textFocus}>{`${module.timeStart} - ${module.timeEnd} ${module.timeFormat}`}</Text>
              </View>
              <View style={styles.textLine}>
                <Text style={styles.textLabel}>{strings.room}</Text>
                <Text style={[styles.textFocus, styles.textRoom]}>{module.room}</Text>
              </View>
              <View style={styles.textLine}>
                <Text style={styles.textLabel}>{strings.lecturer}</Text>
                <Text style={styles.textFocus}>{module.teacherName}</Text>
              </View>
              {/* <Avatar.Text label={item.room} /> */}
            </View>
          </Card.Content>
        </Card>
      </View>

    );
  };
  const renderEmptyDate = (day, item) => {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.emptyText}>🥳 Ngày nghỉ!</Text>
      </View>
    )
  }
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }
  
  useEffect(() => {
    if (currentLanguage == "en") {
      LocaleConfig.defaultLocale = 'en';
    }
    else {
      LocaleConfig.defaultLocale = 'vi';
    }
  }, [currentLanguage,isLoading])
  useEffect(() => {
    if(countPropertiesMethod2(schedule) == 0) {
    // if (true) {
      post_data("schedule", currentUser.id).then((response) => {
        var scheduleArray = [];
        response.forEach((value) => {
          var result = []
          result.push(value);
          let strTime = (new Date(value.dateTime)).toISOString().split('T')[0];
          scheduleArray[strTime] = result;
        });
        
        // Timestamp in milliseconds
        var today = Date.now();
        for (let i = -14; i < 14; i++) {
          const time = today + i * 24 * 60 * 60 * 1000;
          const strTime = (new Date(time)).toISOString().split('T')[0];
          if (scheduleArray[strTime] == undefined) {
            scheduleArray[strTime] = [];
          };
          var objectHolder = Object.assign({}, scheduleArray);
          
        };
        // var object = arr.reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
        // var object = arr.reduce((obj, item) => ({...obj, [item.key]: item.value}) ,{});
        // var object = arr.reduce((obj, item) => (obj[item.key] = item.value, obj) ,{});
        setScheduleHolder(scheduleHolder => ({...scheduleHolder,...objectHolder}));
        dispatch(setSchedule(objectHolder));
        setIsLoading(false);
      })
    }
    else {
      setScheduleHolder(schedule);
      setIsLoading(false);
    }
  }, [])
  return (
    <>
    {isLoading ? (<ActivityIndicator/>) : (
      <Agenda
      items={scheduleHolder}
      loadItemsForMonth={(day) => {}}
      selected={getToday()}
      minDate={minDate(2)}
      maxDate={maxDate(2)}
      renderItem={(item) => { return (renderItem(item)) }}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      theme={{
        agendaDayTextColor: 'black',
        agendaDayNumColor: 'purple',
        agendaTodayColor: 'orange',
        agendaKnobColor: 'red',
        indicatorColor: 'yellow',
        arrowColor: '#7f3e1f',
        selectedDayBackgroundColor: 'green',
        calendarBackground: '#ffffff',
        textDayHeaderFontWeight: 'bold',
        textSectionTitleColor: 'black',
        dotColor: '#49a65a',
        todayDotColor: 'red',
        todayBackgroundColor: 'black',
        todayTextColor: 'yellow',
      }}
    // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
    />
    )}
    </>
    
  );
};

