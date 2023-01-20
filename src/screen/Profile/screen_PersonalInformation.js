import {
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import styles from './ProfileStyles/screen_PersonalInformation_style'
export default function PersonalInformation({navigation}) {
    return (
        <View style={styles.modalContainer}>
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

                <Text style={styles.modalHeader_Title}>Thông tin sinh viên</Text>
            </View>

            <View style={styles.modalContent}>
                <View style={[styles.modalContentItem, {}]}>
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <Image
                            source={require('../../assets/account_thongtin_coban.png')}
                            style={styles.modalContentItem_Icon}
                        />
                        <Text style={styles.accountHeading}>Thông tin cơ bản</Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            Họ và tên
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.data.lastName + ' ' + currentUser.data.firstName}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>Email</Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.data.email}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>MSSV</Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.key}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            Ngày sinh
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.data.dob}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            Nguyên quán
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.data.city}
                        </Text>
                    </View>
                </View>

                <View style={[styles.modalContentItem, { marginVertical: 4 }]}>
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <Image
                            source={require('../../assets/account_thongtin_lienhe.png')}
                            style={styles.modalContentItem_Icon}
                        />
                        <Text style={styles.accountHeading}>Thông tin liên hệ</Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            Điện thoại
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.data.selfPhone}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            Email cá nhân
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.data.selfEmail}
                        </Text>
                    </View>
                </View>

                <View style={[styles.modalContentItem, { flex: 3 }]}>
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <Image
                            source={require('../../assets/account_thongtin_khoahoc.png')}
                            style={styles.modalContentItem_Icon}
                        />
                        <Text style={styles.accountHeading}>Thông tin khóa học</Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            Khóa học
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            Khóa {currentUser.key.substr(1, 2)}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            Niên khóa
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.data.yearAdmission +
                                '-' +
                                (currentUser.data.yearAdmission + 4)}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>
                            Chương trình đào tạo
                        </Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.data.major}
                        </Text>
                    </View>

                    <View style={styles.modalContentItem_RowInfo}>
                        <Text style={styles.modalContentItem_RowInfo_Title}>Lớp</Text>
                        <Text style={styles.modalContentItem_RowInfo_Data}>
                            {currentUser.data.class}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
};
