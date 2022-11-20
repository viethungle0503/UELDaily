import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    useWindowDimensions 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import { TabView, SceneMap } from 'react-native-tab-view';

export default function PreLogin1({navigation}) {
return (
<View style={styles.body}>
    <View style={styles.sectionHeader}></View>

    <View style={styles.sectionIllustration}>
        <Image style={styles.sectionIllustration_Image} source={require('../assets/preLogin1.png')} />
    </View>

    <View style={styles.sectionText}>

        <Text style={styles.sectionText_Title}>Tối ưu chức năng</Text>
        
        <View style={styles.sectionText_DescriptionView}>

            <Text style={styles.sectionText_DescriptionText}>
            Tổ chức những chức năng cần thiết giúp việc học trở nên tối ưu
            </Text>

        </View>

        <View style={styles.readProgressView}> 
            <View
                style={[
                    styles.readProgress,
                    {
                    backgroundColor: '#0065FF',
                    },
                ]}>
            </View>
            <View
                style={styles.readProgress}>
            </View>
            <View
                style={styles.readProgress}>
            </View>
            
        </View>

        <View style={styles.btnStartView}>

            <TouchableOpacity 
                style={styles.btnStart} 
                onPress={() => navigation.navigate('PreLogin2')}>
                <Text style={styles.btnStartText}>Bắt đầu</Text>
            </TouchableOpacity>

        </View>

    </View>

    <View style={styles.sectionFooter}></View>

</View>
);
}
const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
    },
    sectionHeader:{
        flex: 1
    },
    sectionIllustration: {
        flex: 5,
        alignItems: 'center',
    },
    sectionText: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
    },
    sectionFooter: {
        flex: 1,
        justifyContent: 'flex-start'
        
    },
    sectionIllustration_Image: {
        aspectRatio: 0.8,
        flex: 1,
        resizeMode: 'contain',
    },
    sectionText_Title: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 25,
    },
    sectionText_DescriptionView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionText_DescriptionText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: '#344161CC',
    },
    readProgressView: {
        width: 45,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    readProgress: {
        opacity: 1,
        width: 10,
        height: 10,
        borderRadius: 100,
        backgroundColor: '#D9D9D9',
    },
    btnStartView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: 40,
    },

    btnStart: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    
        borderRadius: 8,
        backgroundColor: '#0065FF',
        paddingVertical: 12,
    },
    btnStartText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
    },
});
  