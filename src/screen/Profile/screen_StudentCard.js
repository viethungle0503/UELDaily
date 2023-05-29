import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import styles from './ProfileStyles/screen_StudentCard_style';
import strings from '../Language';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
export default function StudentCard( {navigation} ) {
    const currentUser = useSelector(state => state.user.currentUser);
    const currentLanguage = useSelector(state => state.user.currentLanguage);
    useEffect(() => {

    },[currentLanguage])
    return (
        <ScrollView style={styles.modalContainer}>
            <Image
                style={styles.effectLeft}
                source={require('../../assets/preLoginEffectLeft.png')}
            />
            <Image
                style={styles.modalEffect}
                source={require('../../assets/mediaEffect.png')}
            />

            <View style={styles.modalHeader}>
                <TouchableOpacity
                    style={styles.modalHeader_btnBackContainer}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../assets/btnBack.png')}
                        style={styles.modalHeader_btnBack}
                    />
                </TouchableOpacity>

                <Text style={styles.modalHeader_Title}>Thẻ sinh viên điện tử</Text>
            </View>

            <View style={styles.modalContent}>
               
            </View>
                
        </ScrollView>
    )
};
