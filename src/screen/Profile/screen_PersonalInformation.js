import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import styles from './ProfileStyles/screen_PersonalInformation_style';
import strings from '../Language';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
export default function PersonalInformation({navigation}) {
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

                <Text style={styles.modalHeader_Title}>{strings.student_information}</Text>
            </View>

            <View style={styles.modalContent}>
                <View style={[styles.modalContentItem, {}]}>
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <Image
                            source={require('../../assets/account_thongtin_coban.png')}
                            style={styles.modalContentItem_Icon}
                        />
                        <Text style={styles.accountHeading}>{strings.basic_information}</Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            {strings.full_name}
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.lastName + ' ' + currentUser.firstName}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>{strings.email}</Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.email}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>{strings.student_id}</Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.id}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            {strings.date_of_birth}
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.dob}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            {strings.place_of_origin}
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.town}
                        </Text>
                    </View>
                </View>

                <View style={[styles.modalContentItem, { marginVertical: 4 }]}>
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <Image
                            source={require('../../assets/account_thongtin_lienhe.png')}
                            style={styles.modalContentItem_Icon}
                        />
                        <Text style={styles.accountHeading}>{strings.contact_information}</Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            {strings.phone}
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.selfPhone}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            {strings.personal_email}
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.selfEmail}
                        </Text>
                    </View>
                </View>

                <View style={[styles.modalContentItem, { flex: 3 }]}>
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <Image
                            source={require('../../assets/account_thongtin_khoahoc.png')}
                            style={styles.modalContentItem_Icon}
                        />
                        <Text style={styles.accountHeading}>{strings.course_information}</Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            {strings.course}
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            Khóa {currentUser.id.substr(1, 2)}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            {strings.school_year}
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.yearAdmission +
                                '-' +
                                (currentUser.yearAdmission + 4)}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            {strings.education_program}
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.major}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>{strings.class}</Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {`${currentUser.id.substr(0, 6)}${currentUser.email.substr(currentUser.email.indexOf("@st.uel.edu.vn") - 1,1)}`}
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};
