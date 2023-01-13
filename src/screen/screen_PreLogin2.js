import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    setAtPreLogin1, 
    setAtPreLogin2,
  } from '../redux_toolkit/userSlice';
import {useDispatch} from 'react-redux';
  
export default function PreLogin2({navigation}) {
    const dispatch = useDispatch();
return (
<View style={styles.body}>
    <View style={styles.sectionHeader}>
        <Image style={styles.sectionIllustration_EffectLeft} source={require('../assets/preLoginEffectLeft.png')} />
    </View>

    <View style={styles.sectionIllustration}>
        <Image style={styles.sectionIllustration_Image} source={require('../assets/preLogin2.png')} />
    </View>

    <View style={styles.sectionText}>

        <Text style={styles.sectionText_Title}>Hiện đại hóa</Text>
        
        <View style={styles.sectionText_DescriptionView}>

            <Text style={styles.sectionText_DescriptionText}>
            Nâng cao chất lượng học tập nhờ hiện đại hóa các công cụ hỗ trợ
            </Text>

        </View>

        <View style={styles.readProgressView}> 
            <View
                style={styles.readProgress}>
            </View>
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
            
        </View>

        <View style={styles.btnStartView}>

            <TouchableOpacity style={styles.btnStart} onPress={() => dispatch(setAtPreLogin2(false))}>
                <Text style={styles.btnStartText}>Tiếp theo</Text>
            </TouchableOpacity>

        </View>

    </View>

    <View style={styles.sectionFooter}>
        <Image style={styles.sectionIllustration_EffectRightBottom} source={require('../assets/preLoginEffectRightBottom.png')} />
    </View>

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
        flex: 1,
        position: 'relative'
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
        position: 'relative'        
    },
    sectionIllustration_Image: {
        aspectRatio: 0.8,
        flex: 1,
        resizeMode: 'contain',

    },
    sectionIllustration_EffectLeft: {
        position: 'absolute',
        top: 50,
        left: 0,
    },
    sectionIllustration_EffectRightBottom: {
        position: 'absolute',
        right: 0,
        bottom: -10
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
  