import {
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './HomeScreenStyles/screen_Homework2Tab_style';
import { useSelector } from 'react-redux';
import { dateDiffInDays } from '../GlobalFunction';


export default function HWTab1({ navigation, route }) {
  const modules = useSelector(state => state.user.modules);
  return (
    <View style={styles.body}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={modules}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          var length = item.information.dates.length;
          var startDate = null;
          var endDate = null;
          var startDateFormat = null;
          var endDateFormat = null;
          var today = null;
          var distanceTime = null;
          for (let i = 0; i < length; i++) {
            // StartDate
            if (item.information.dates[i].label == "Opened:") {
              startDate = new Date(item.information.dates[i].timestamp * 1000);
              startDateFormat = `${startDate.getHours()}h${startDate.getMinutes()} ngày ${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
            }
            // EndDate
            else if (item.information.dates[i].label == "Due:") {
              endDate = new Date(item.information.dates[i].timestamp * 1000);
              endDateFormat = `${endDate.getHours()}h${endDate.getMinutes()} ngày ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
            }
          }
          // DifferenceDate
          if (endDate !== null) {
            today = new Date();
            distanceTime = dateDiffInDays(today, endDate);
          }
          return (
            (
              <TouchableOpacity onPress={() => {
                navigation.navigate('NewsDetail', { link: item.information.url });
              }}
                style={styles.hwItem}>
                <Text style={styles.hwtext_subject}>{`${item.fullname}`}</Text>

                <Text style={styles.hwtext_topic}>{`${item.information.name}`}</Text>

                <View style={styles.row}>
                  <Text style={styles.hwtext_schedule}>{`${startDateFormat} - ${endDateFormat}`}</Text>
                  <View style={styles.timedueContainer}>
                    <Image
                      style={styles.timedueIcon}
                      source={require('../../assets/hw_timedue_icon.png')}
                    />
                    <Text style={styles.timedueText}>{distanceTime}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          )
        }
        }
      />
    </View>
  );
}
