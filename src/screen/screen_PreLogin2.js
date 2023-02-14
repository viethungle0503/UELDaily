import {
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    setAtPreLogin1,
    setAtPreLogin2,
} from '../redux_toolkit/userSlice';
import { useDispatch } from 'react-redux';
import styles from './Styles/screen_PreLogin2_styles';
import strings from './Language';

export default function PreLogin2({ navigation }) {
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

