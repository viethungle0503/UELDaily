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
import styles from './HomeScreenStyles/screen_HomeworkTab_2_style'

export default function HWTab2({ navigation }) {
    return (
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <View style={[styles.hwItem, {
                marginTop: 25,
            }]}>
                <Text style={styles.hwtext_subject}>
                    Phát triển web kinh doanh
                </Text>
                <Text style={styles.hwtext_topic}>
                    Bài tập 1
                </Text>
                <View style={styles.row}>
                    <Text style={styles.hwtext_schedule_danger}>
                        12h00 ngày 12/12 - 18h00 ngày 19/10
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
                    Bài tập trên lớp (14/11/2022)
                </Text>
                <View style={styles.row}>
                    <Text style={styles.hwtext_schedule_danger}>
                        12h00 ngày 14/11 - 12h00 ngày 15/12
                    </Text>
                    <View style={[styles.timedueContainer, styles.timedue_danger]}>
                        <Image
                            style={styles.timedueIcon}
                            source={require('../../assets/hw_timedue_icon.png')}
                        />
                        <Text style={styles.timedueText}>
                            -5 ngày
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.hwItem}>
                <Text style={styles.hwtext_subject}>
                    Phân tích và thiết kế Hệ thống thông tin
                </Text>
                <Text style={styles.hwtext_topic}>
                    Week 3: DFD POS System
                </Text>
                <View style={styles.row}>
                    <Text style={styles.hwtext_schedule_danger}>
                        12h00 ngày 11/11 - 18h00 ngày 11/12
                    </Text>
                    <View style={[styles.timedueContainer, styles.timedue_danger]}>
                        <Image
                            style={styles.timedueIcon}
                            source={require('../../assets/hw_timedue_icon.png')}
                        />
                        <Text style={styles.timedueText}>
                            -9 ngày
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

