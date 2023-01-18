import {Agenda, LocaleConfig} from 'react-native-calendars';
import {Text, View, StyleSheet} from 'react-native';

LocaleConfig.locales['fr'] = {
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
    monthNamesShort: [ '1 ',
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
    '12',],
    dayNames: ['Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: "Hôm nay",
  };
  LocaleConfig.defaultLocale = 'vn';
export default function Schedule() {
    return(
        <Agenda/>
    )
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