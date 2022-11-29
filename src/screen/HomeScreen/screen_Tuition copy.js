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

export default function Tuition() {

    const [open, setOpen] = React.useState(false);
    const [year,setYear] = useState(currentUser.data.currentYear);
    const [tuition, setTuition] = useState(setSelectedSchoolYear(year));
    function setSelectedSchoolYear(year) {
        const temp = currentUser.data.tuition.filter(function (item) {
            return item.school_year == year;
        }).map((item, index) => (
            <TouchableOpacity style={styles.listItem} onPress={() => {
                console.log(this);
                setOpen(true);
            }} key={index}>
                <View style={styles.listItem_Markup}></View>
                <Text style={styles.listItem_SemesterTitle}>Học kỳ: {item.semester}</Text>
                <View style={styles.listItem_Content}>
                    <Text style={styles.listItem_ContentTitle}>Tổng tiền:&nbsp;</Text>
                    <Text style={styles.listItem_ContentData}>{item.amount}</Text>
                </View>

                <View style={styles.listItem_Content}>
                    <Text style={styles.listItem_ContentTitle}>Tình trạng:&nbsp;</Text>
                    {
                        (item.amountPaid < item.amount) ?
                            (<Text style={styles.listItem_ContentData}>Chưa đóng</Text>)
                            :
                            (<Text style={styles.listItem_ContentData}>Đã đóng</Text>)
                    }
                </View>
                <TouchableOpacity
                    style={styles.listItem_ViewDetail}
                    onPress={() => setOpen(true)}
                >
                    <Text style={styles.listItem_ViewDetail_Text}>Chi tiết</Text>
                    <MaterialCommunityIcons
                        name={'arrow-right-thin'}
                        size={22}
                        color={'#fff'}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        ));
        return temp;
    }
    const pickerRef = useRef();

    function openPicker() {
        pickerRef.current.focus();
    }

    function closePicker() {
        pickerRef.current.blur();
    }
    return (
        <View style={styles.body}>
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

                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderText}>Học phí HK01 2020-2021</Text>

                        </View>

                        <View style={styles.modalDetail}>
                            <View style={styles.modalDetail_Header}>
                                <Text style={[styles.modalDetail_HeaderText, styles.modalDetail_colContent]}>Nội dung</Text>
                                <Text style={[styles.modalDetail_HeaderText, styles.modalDetail_colPayAmount]}>Số tiền</Text>
                                <Text style={[styles.modalDetail_HeaderText, styles.modalDetail_colPaid]}>Đã trả</Text>
                            </View>


                            <View style={styles.modalDetail_RowData}>
                                <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colContent]}>Học phí</Text>
                                <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPayAmount]}>13,900,000đ</Text>
                                <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPaid]}>0đ</Text>
                            </View>

                            <View style={styles.modalDetail_RowData}>
                                <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colContent]}>Bảo hiểm y tế</Text>
                                <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPayAmount]}>540,000đ</Text>
                                <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPaid]}>540,000đ</Text>
                            </View>

                            <View style={styles.modalDetail_RowData}>
                                <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colContent]}>Khám sức khỏe</Text>
                                <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPayAmount]}>100,000đ</Text>
                                <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPaid]}>100,000đ</Text>
                            </View>

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
                                }>14,540,000đ</Text>

                            </View>

                        </View>

                        <TouchableOpacity
                            style={styles.modalFooter_ButtonClose}
                            onPress={() => setOpen(false)}
                        >
                            <Text style={styles.modalFooter_ButtonCloseText}>Close</Text>
                        </TouchableOpacity>

                        {/* <MaterialCommunityIcons 
                        style={styles.modalFooterButtonClose}
                        name={'close'}
                        size={20}
                        color={'#252525'}
                        onPress={() => setOpen(false)}
                    /> */}



                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>

                </View>
            </Modal>

            <View style={styles.list}>
                <Picker style={styles.listSemester}
                    mode='dropdown'
                    ref={pickerRef}
                    selectedValue={year}
                    onValueChange={(itemValue) => {
                        setYear(itemValue);
                        setTuition(setSelectedSchoolYear(itemValue))
                    }
                    }>
                    <Picker.Item label='Năm học 2020 - 2021' value={1} />
                    <Picker.Item label='Năm học 2021 - 2022' value={2} />
                    <Picker.Item label='Năm học 2022 - 2023' value={3} />
                </Picker>
                {tuition}
            </View>

        </View>
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
        minWidth: 120,
    },
    modalDetail_colPayAmount: {
        minWidth: 85,
        textAlign: 'right',
    },
    modalDetail_colPaid: {
        minWidth: 85,
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
        flex: 6,
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
        backgroundColor: '#E3ECFF',
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
        color: '#fff',
        fontSize: 13
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