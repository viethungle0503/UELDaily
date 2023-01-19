import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';

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
LocaleConfig.defaultLocale = 'vi';
function getToday() {
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  return year + '-' + month + '-' + date;
}
function minDate(weeks = 2) {
  var today = new Date();
  var timestamp = today.getTime() -  (weeks * 24 * 60 * 60 * 1000 * 7);
  today = new Date(timestamp);
  return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}
function maxDate(weeks = 2) {
  var today = new Date();
  var timestamp = today.getTime() +  (weeks * 24 * 60 * 60 * 1000 * 7);
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
const Schedule = () => {
  const [items, setItems] = useState({});
  const loadItems = (day) => {
    setTimeout(() => {
      var schedules = currentUser.data.schedules
      for (let i = -14; i < 14; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = (new Date(time)).toISOString().split('T')[0];
        if (!items[strTime]) {
          items[strTime] = [];
          if (schedules[strTime]) {
            const numItems = objectLength(schedules[strTime]);
            for (let j = 0; j < numItems; j++) {
              items[strTime].push({
                courseName: schedules[strTime][0].courseName,
                teacherName: schedules[strTime][0].teacherName,
                room: schedules[strTime][0].room,
                timeStart: schedules[strTime][0].timeStart,
                timeEnd: schedules[strTime][0].timeEnd,
                timeFormat: schedules[strTime][0].timeFormat,
              });
            }
            // console.log(items[strTime])
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 0);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Card style={styles.item}>
          <Card.Content>
            <View>
              <Text style={styles.courseName}>
                {item.courseName}
              </Text>
              <View style={styles.textLine}>
                <Text style={styles.textLabel}>Thời gian</Text>
                <Text style={styles.textFocus}>{item.timeStart + item.timeEnd + item.timeFormat}</Text>
              </View>
              <View style={styles.textLine}>
                <Text style={styles.textLabel}>Phòng học</Text>
                <Text style={[styles.textFocus, styles.textRoom]}>{item.room}</Text>
              </View>
              <View style={styles.textLine}>
                <Text style={styles.textLabel}>Giảng viên</Text>
                <Text style={styles.textFocus}>{item.teacherName}</Text>
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
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={getToday()}
        minDate={minDate()}
        maxDate={maxDate()}
        renderItem={renderItem}
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
          dotColor:'#49a65a',
          todayDotColor:'red',
          todayBackgroundColor:'black',
          todayTextColor:'yellow',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer_delete: {
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 204, 179, 0.4);',
    paddingLeft: 10,
    marginRight: 10,
    marginTop: 30,
    minHeight: 114,
  },

  item: {
    height: '100%',
    backgroundColor: '#ffffff',
    shadowColor: 'rgb(0, 101, 255)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    flex: 1,
    verticalAlign: 'center',
  },
  emptyText: {
    fontSize: 20,
    color:'red',
    marginTop: 35,
  },

  textLine: {
    fontSize: 14,
    display: 'flex',
    flexDirection: 'row',
  },
  textLabel: {
    // flex: 1,
    minWidth: 80,
  },
  textFocus: {
    color: 'black',
    // flex: 3,
  },
  courseName: {
    fontWeight: 'bold',
    color: 'black',
  },
  textRoom: {
    color: '#FF6E35',
  },
});

export default Schedule;