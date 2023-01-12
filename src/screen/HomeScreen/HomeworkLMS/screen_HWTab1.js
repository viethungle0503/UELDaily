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
import EStyleSheet from 'react-native-extended-stylesheet';

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
                        source={require('../../../assets/hw_timedue_icon.png')}
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
                        source={require('../../../assets/hw_timedue_icon.png')}
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
                        source={require('../../../assets/hw_timedue_icon.png')}
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
const styles = StyleSheet.create({
   

body: {
    
    backgroundColor: '#F6F8FE',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,

    marginBottom: 50,
},
hwItem:{
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderLeftColor: '#7BAFFF',
    borderLeftWidth: 3,

    paddingHorizontal: 15,
    paddingVertical: 10,

    marginBottom: 15,

    shadowColor: 'rgb(0, 101, 255)',
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,

    elevation: 2,
},

hwtext_subject:{
    color: '#625F5F',
    fontSize: 15,

},
hwtext_topic:{
    color: '#252525',
    fontSize: 17,
    fontWeight: '600',
    paddingBottom: 3, 

},
hwtext_schedule_danger:{
    color: '#FF6E35',
    fontWeight: '500',
    width: '75%',
 
    
},
hwtext_schedule_warning:{
    color: '#FCCD41',
    fontWeight: '500',
    width: '75%',
},
hwtext_schedule_normal:{
    color: '#40CFF7',
    fontWeight: '500',
    width: '75%',
},
timedueContainer:{
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,
},
timedue_danger:{
    backgroundColor: '#FF6E35',
},
timedue_warning:{
    backgroundColor: '#FCCD41',
},
timedue_normal:{
    backgroundColor: '#40CFF7',
},
timedueIcon:{
    height: 18,
    width: 18,
    marginRight: 3,
},
timedueText:{
    color: '#FFF',

},

row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

}
});
  