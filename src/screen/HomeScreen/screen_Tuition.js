import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './HomeScreenStyles/screen_Tuition_style';

export default function Tuition() {
    const [open, setOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = useState();
    const [modalContent, setModalContent] = useState();
    const tuition = currentUser.data.tuition.map((item, index) => {
        const subTuition = item.semester.map((subItem, subIndex) => {
            function settingModal() {
                const title = (() => (
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>{`Học phí HK${subItem.semester_type} ${item.start_year}-${item.end_year}`}</Text>
                    </View>
                ));
                const content = (() => {
                    const section = subItem.fee.map((lastItem, lastIndex) => (
                        <View style={styles.modalDetail_RowData} key={lastIndex}>
                            <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colContent]}>{lastItem.typeName}</Text>
                            <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPayAmount]}>{lastItem.amount}</Text>
                            <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPaid]}>{lastItem.paid}</Text>
                        </View>
                    ))
                    return (
                        <View style={styles.modalDetail}>
                            <View style={styles.modalDetail_Header}>
                                <Text style={[styles.modalDetail_HeaderText, styles.modalDetail_colContent]}>Nội dung</Text>
                                <Text style={[styles.modalDetail_HeaderText, styles.modalDetail_colPayAmount]}>Số tiền</Text>
                                <Text style={[styles.modalDetail_HeaderText, styles.modalDetail_colPaid]}>Đã trả</Text>
                            </View>
                            {section}
                            <View style={styles.modalTotalPay}>
                                <Text style={
                                    {
                                        color: '#FF6E35'
                                    }
                                }>Tổng tiền phải thanh toán</Text>
                                <Text style={
                                    {
                                        color: '#FF6E35',
                                        fontWeight: 'bold'
                                    }
                                }>{(subItem.totalAmount) - (subItem.totalPaid)}đ</Text>

                            </View>

                        </View>
                    )
                });
                setModalTitle(title);
                setModalContent(content);
                setOpen(true);
            }
            return (
                <TouchableOpacity style={styles.listItem} onPress={() => settingModal()} key={subIndex}>
                    <View style={[styles.listItem_Markup, (subItem.totalPaid < subItem.totalAmount) ? { backgroundColor: '#FF967C' } : { backgroundColor: '#E3ECFF' }]}></View>
                    <Text style={styles.listItem_SemesterTitle}>Học kỳ: {subItem.semester_type}</Text>
                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Tổng tiền:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>{subItem.totalAmount}</Text>
                    </View>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Tình trạng:&nbsp;</Text>
                        {
                            (subItem.totalPaid < subItem.totalAmount) ?
                                (<Text style={styles.listItem_ContentData}>Chưa đóng</Text>)
                                :
                                (<Text style={styles.listItem_ContentData}>Đã đóng</Text>)
                        }
                    </View>
                    <TouchableOpacity
                        style={[styles.listItem_ViewDetail,(subItem.totalPaid < subItem.totalAmount) ? 
                        {backgroundColor:'#FF502D'} : {backgroundColor:'#0065FF'}]}
                        
                        onPress={() => settingModal()}>
                        <Text style={styles.listItem_ViewDetail_Text}>Chi tiết</Text>
                        <MaterialCommunityIcons
                            name={'arrow-right-thin'}
                            size={22}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            )
        });
        return (
            <View style={styles.list} key={index}>
                <Text style={styles.listSemester}>{item.name}</Text>
                {subTuition}
            </View>

        )
    }
    );
    return (
        <ScrollView style={styles.body}>
            <Modal
                visible={open}
                transparent={true}>
                <View style={styles.modalBackground} >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalIconContainer}>
                            <MaterialCommunityIcons
                                style={styles.modalIcon}
                                name={'clipboard-text-outline'}
                                size={35}
                                color={'#FFF'}
                            />
                        </View>
                        {modalTitle}
                        {modalContent}
                        <TouchableOpacity
                            style={styles.modalFooter_ButtonClose}
                            onPress={() => setOpen(false)}>
                            <Text style={styles.modalFooter_ButtonCloseText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                </View>
            </Modal>
            {tuition}
        </ScrollView>
    )
}

