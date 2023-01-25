import React from "react";
// import styles from '../screen/Media/MediaStyles/screen_MediaModal_style';

import {
    Text, View, TouchableOpacity, Dimensions, Image, ScrollView, StyleSheet
} from 'react-native'





const ModalUpdateNoti = (props) => {
    const [modalTitle, setModalTitle] = useState();
    const [modalContent, setModalContent] = useState();
    
    closeUpdateNoti= (bool) => {
        props.changeModalUpdateNotiVisible(bool);
    }

    return (
        <View style={styles.modalContainer}>
            {/* 2 effect */}
            <Image
                style={styles.modalEffectLeft}
                source={require('../assets/preLoginEffectLeft.png')}
            />
            <Image
                style={styles.modalEffectRight}
                source={require('../assets/preLoginEffectRightBottom.png')}
            />
            {/* 2 effect */}


            <TouchableOpacity
                style={styles.btnBackContainer} 
                
                onPress={() => closeUpdateNoti(false)}>

                <Image
                    source={require('../assets/btnBack.png')}
                    style={styles.btnBack}
                />
            </TouchableOpacity>

            <ScrollView>
                
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeader_DepartmentName}>
                        Về việc đóng học phí HK1 (2022 - 2023)
                    </Text>

                    <View >
                        <Image source={require('../assets/component_ModalUpdateNoti_Icon.png')}/>

                        <Text style={styles.modalHeader_DepartmentName}>
                            Phòng Tài chính UEL
                        </Text>

                        <Text style={styles.modalHeader_DepartmentName}>
                            phongtc@uel.edu.vn
                        </Text>
                    </View>
                </View>



                <View style={styles.modal}>

                </View>

            </ScrollView>

            
        </View>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        position: 'relative',
    },
    modalEffectLeft:{
        position: 'absolute',
        top: '50%',
        left: 0
    },
    modalEffectRight:{
        position: 'absolute',
        bottom: '10%',
        right: 0
    },

    btnBackContainer: {
        width: 25,
    },
    btnBack: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
    },

    modalHeader: {
        backgroundColor: 'red'
    },
    modalHeader_DepartmentName: {
        fontSize: 19,
        fontWeight: '700',
        color: '#252525',
        paddingHorizontal: 10,
    }

})

export {ModalUpdateNoti}