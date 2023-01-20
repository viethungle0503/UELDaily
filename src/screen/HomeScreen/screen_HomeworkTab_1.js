import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    TouchableHighlight,
    ScrollView,
    FlatList
  } from 'react-native';
import styles from './HomeScreenStyles/screen_HomeworkTab_1_style'

export default function HWTab1({navigation}) {

    return (
    <ScrollView style={styles.body} showsVerticalScrollIndicator={false}    >

        <View style={[styles.hwItem, {
            marginTop: 25, 
        }]}>
            <Text style={styles.hwtext_subject}>
                Phát triển web kinh doanh
            </Text>

            <Text style={styles.hwtext_topic}>
                Bài tập 2
            </Text>
            
            <View style={styles.row}>
                <Text style={styles.hwtext_schedule_danger}>
                12:00 20/12 - 18:00 21/12
                </Text>

                <View style={[styles.timedueContainer, styles.timedue_danger]}>

                    <Image 
                        style={styles.timedueIcon}
                        source={require('../../assets/hw_timedue_icon.png')}
                    />
                
                    <Text style={styles.timedueText}>
                        9 giờ
                    </Text>
                </View>
            </View>

        </View>

        <View style={styles.hwItem}>
            <Text style={styles.hwtext_subject}>
                Phát triển web kinh doanh
            </Text>

            <Text style={styles.hwtext_topic}>
            Báo cáo đồ án cuối kỳ
            </Text>
            
            <View style={styles.row}>
                <Text style={styles.hwtext_schedule_warning}>
                12:00 20/12 - 18:00 21/12
                </Text>

                <View style={[styles.timedueContainer, styles.timedue_warning]}>

                    <Image 
                        style={styles.timedueIcon}
                        source={require('../../assets/hw_timedue_icon.png')}
                    />
                
                    <Text style={styles.timedueText}>
                        3 ngày
                    </Text>
                </View>
            </View>

        </View>

        <View style={styles.hwItem}>
            <Text style={styles.hwtext_subject}>
            Phân tích và thiết kế Hệ thống thông tin
            </Text>

            <Text style={styles.hwtext_topic}>
            Group final project
            </Text>
            
            <View style={styles.row}>
                <Text style={styles.hwtext_schedule_normal}>
                12:00 20/12 - 18:00 21/12
                </Text>

                <View style={[styles.timedueContainer, styles.timedue_normal]}>

                    <Image 
                        style={styles.timedueIcon}
                        source={require('../../assets/hw_timedue_icon.png')}
                    />
                
                    <Text style={styles.timedueText}>
                        9 ngày
                    </Text>
                </View>
            </View>

        </View>

    </ScrollView>
);
}

  