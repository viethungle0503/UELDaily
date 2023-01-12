import { withTheme } from '@rneui/themed';
import React, { useRef } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    Modal

} from 'react-native';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { color } from 'react-native-reanimated';

export default function Tuition() {

    const [open, setOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = useState();
    const [modalContent, setModalContent] = useState();
    const tuition = currentUser.data.tuition.map((item, index) => {
        const subTuition = item.semester.map((subItem, subIndex) => {
            function settingModal() {
                const title = (() => (
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Học phí HK{subItem.semester_type} {item.start_year}-{item.end_year}</Text>
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

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    modalBackground: {
        flex: 1,
        // backgroundColor: 'rbga(0,0,0,0.5)',
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '92%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 20,
        elevation: 20,
    },

    modalIconContainer: {
        backgroundColor: '#0065FF',
        borderWidth: 2.5,
        borderColor: '#FFF',
        borderRadius: 50,
        position: 'absolute',
        left: '50%',
        top: -30,
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    modalHeaderText: {
        fontSize: 20,
        color: '#252525',
        fontWeight: 'bold'
    },
    modalDetail: {
        borderRadius: 10,
        backgroundColor: '#F7F9FE',
        paddingHorizontal: 15,
        paddingVertical: 20
    },

    modalDetail_Header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#EDEDED',
        paddingBottom: 5,
        marginBottom: 5,
    },
    modalDetail_RowData: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    modalDetail_RowDataText: {
        color: '#252525'
    },
    modalDetail_HeaderText: {
        fontWeight: 'bold',
        color: '#252525',
    },
    modalDetail_colContent: {
        
        width: 140,
    },
    modalDetail_colPayAmount: {
        width: 80,
        textAlign: 'right',
    },
    modalDetail_colPaid: {
        width: 80,
        textAlign: 'right',
    },
    modalTotalPay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#EDEDED',
        paddingTop: 10,
        marginVertical: 5
    },

    modalFooter_ButtonClose: {
        backgroundColor: '#0065FF',

        color: '#0065FF',
        borderRadius: 8,
        width: '100%',
        height: 35,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    modalFooter_ButtonCloseText: {
        color: '#FFF',
    },
    list: {
        marginBottom: 15,
        height: 350
    },

    listSemester: {
        marginHorizontal: 24,
        marginVertical: 20,
        color: '#0065FF',
        fontWeight: 'bold',
        fontSize: 16
    },
    listItem: {
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,

        marginBottom: 10,
        marginHorizontal: 18,

        shadowColor: 'rgb(0, 101, 255)',
        shadowOffset: {
            width: 0,
            height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,

        elevation: 2,
    },
    listItem_Markup: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 6,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
    },
    listItem_SemesterTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#080B09',

        marginBottom: 5,
    },
    listItem_Content: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 15,
    },
    listItem_ContentTitle: {
        color: '#938F8F',
    },
    listItem_ContentData: {
        color: '#000000',
    },
    listItem_ViewDetail: {
        position: 'absolute',
        bottom: 8,
        right: 16,

        backgroundColor: '#0065FF',
        shadowColor: 'rgba(0, 101, 255, 0.25)',
        shadowOffset: {
            width: 0,
            height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,

        elevation: 2,

        borderRadius: 8,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 1


    },
    listItem_ViewDetail_Text: {
        fontSize: 13,
        color: '#FFF',
        
    },

    col: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    row: {
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'flex-start',
        marginTop: 12,
        marginRight: 10,
        // overflow: 'hidden'
    },

});