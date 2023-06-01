import {
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
//import { TabView, SceneMap } from 'react-native-tab-view';
import {
    setAtPreLogin1,
    setAtPreLogin2,
} from '../redux_toolkit/userSlice';
import { useDispatch } from 'react-redux';
import styles from './Styles/screen_PreLogin1_styles';
import strings from './Language';

export default function PreLogin1({ navigation }) {
    const dispatch = useDispatch();
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
                        onPress={() => {
                            dispatch(setAtPreLogin1(false));
                            dispatch(setAtPreLogin2(true));
                        }}>
                        <Text style={styles.btnStartText}>Bắt đầu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionFooter}></View>
        </View>
    );
}

