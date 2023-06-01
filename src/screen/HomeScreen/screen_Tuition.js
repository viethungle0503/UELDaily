import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    SectionList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './HomeScreenStyles/screen_Tuition_style';
import post_data from '../UEL';
import { useSelector, useDispatch } from 'react-redux';
import { setTuition } from '../../redux_toolkit/userSlice';
import { groupBy } from '../GlobalFunction';
import strings from '../Language';

export default function Tuition() {
    const dispatch = useDispatch();
    const tuition = useSelector(state => state.user.tuition);
    const currentUser = useSelector(state => state.user.currentUser);
    const [tuitionHolder, setTuitionHolder] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = useState();
    const [modalContent, setModalContent] = useState();

    useEffect(() => {
        if(tuition.length == 0) {
            post_data("tuition", currentUser.id).then((response) => {
                var groupByYear = groupBy(response, item => item.startYear);
                var sectionArray = [];
                var partArray = [];
                groupByYear.forEach((groupedYear) => {
                    let moduleArray = [];
                    var groupBySemester = groupBy(groupedYear, item => item.semester);
                    groupBySemester.forEach((value, key, map) => {
                        moduleArray= [...moduleArray,value];
                    });
                    let title = `${strings.year} ${groupedYear[0].startYear} - ${groupedYear[0].endYear}`
                    sectionArray = [...sectionArray, { title: title, data: moduleArray }];
                });
                setTuitionHolder(sectionArray);
                dispatch(setTuition(sectionArray));
            });
        }
        else {
            setTuitionHolder(tuition);
        }
    }, [])
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
            <SectionList
                sections={tuitionHolder}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => {
                    function settingModal(totalAmount, totalPaid) {
                        const title = (() => (
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalHeaderText}>{`Học phí HK${item[0].semester} ${item[0].startYear}-${item[0].endYear}`}</Text>
                            </View>
                        ));
                        const content = (() => {
                            const section = item.map((subItem, subIndex) => (
                                <View style={styles.modalDetail_RowData} key={subIndex}>
                                    <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colContent]}>{subItem.tuitionName}</Text>
                                    <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPayAmount]}>{subItem.amount}</Text>
                                    <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPaid]}>{subItem.amountPaid}</Text>
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
                                        }>{(totalAmount) - (totalPaid)}đ</Text>
        
                                    </View>
        
                                </View>
                            )
                        });
                        setModalTitle(title);
                        setModalContent(content);
                        setOpen(true);
                    }
                    let totalPaid = null;
                    let totalAmount = null;
                    item.forEach((value) => {
                        totalPaid += value.amountPaid;
                        totalAmount += value.amount;
                    })
                    return (
                        <TouchableOpacity style={styles.listItem} onPress={() => settingModal(totalAmount, totalPaid)}>
                            <View style={[styles.listItem_Markup, (totalPaid < totalAmount) ? { backgroundColor: '#FF967C' } : { backgroundColor: '#E3ECFF' }]}></View>
                        <Text style={styles.listItem_SemesterTitle}>{`${strings.semester} ${item[0].semester}`}</Text>
                        <View style={styles.listItem_Content}>
                            <Text style={styles.listItem_ContentTitle}>Tổng tiền:&nbsp;</Text>
                            <Text style={styles.listItem_ContentData}>{totalAmount}</Text>
                        </View>
    
                        <View style={styles.listItem_Content}>
                            <Text style={styles.listItem_ContentTitle}>Tình trạng:&nbsp;</Text>
                            <Text style={styles.listItem_ContentData}>{(totalPaid == totalAmount) ? (strings.paid) : (totalPaid == 0 ? (strings.unpaid) : (strings.owed))}</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.listItem_ViewDetail,(totalPaid < totalAmount) ? 
                            {backgroundColor:'#FF502D'} : {backgroundColor:'#0065FF'}]}
                            
                            onPress={() => settingModal(totalAmount, totalPaid)}>
                            <Text style={styles.listItem_ViewDetail_Text}>Chi tiết</Text>
                            <MaterialCommunityIcons
                                name={'arrow-right-thin'}
                                size={22}
                                color={'#fff'}
                            />
                        </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.listSemester}>{title}</Text>
                )}
            />
        </View>
    )
}

