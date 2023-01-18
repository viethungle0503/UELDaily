import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';

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
// Get current date
const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return year + '-' + month + '-' + date;
};
export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  render() {
    return (
      <Agenda
        // showClosingKnob={true}
        style={styles.container}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={getCurrentDate()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        theme={{
          agendaDayTextColor: '#FF6E35',
          agendaDayNumColor: '#FF6E35',
          agendaTodayColor: '#FF6E35',
          agendaKnobColor: '#D9D9D9',
          indicatorColor: '#3384FF',
          arrowColor: 'red',
          selectedDayBackgroundColor: '#3384FF',
          calendarBackground: '#ffffff',
          textDayHeaderFontWeight: 'bold',
          textSectionTitleColor: 'black',
        }}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem() {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={styles.courseName}>
            Phân tích thiết kế Hệ thống thông tin quản lý
          </Text>
          <View style={styles.textLine}>
            <Text style={styles.textLabel}>Thời gian</Text>
            <Text style={styles.textFocus}>7h00 - 9h30 SA</Text>
          </View>
          <View style={styles.textLine}>
            <Text style={styles.textLabel}>Phòng học</Text>
            <Text style={[styles.textFocus, styles.textRoom]}>A.707</Text>
          </View>
          <View style={styles.textLine}>
            <Text style={styles.textLabel}>Giảng viên</Text>
            <Text style={styles.textFocus}>Cô Vũ Thuý Hằng</Text>
          </View>
        </View>
      </View>
    );
  }

  renderEmptyDate(item) {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.emptyText}>🥳 Ngày nghỉ!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

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
