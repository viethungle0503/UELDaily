import { StyleSheet } from "react-native";
export default StyleSheet.create({
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