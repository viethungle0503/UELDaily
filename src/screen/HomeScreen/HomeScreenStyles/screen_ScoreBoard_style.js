import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
    },
    fixItem: {
      paddingTop: 15,
      position: 'relative',
      top: 0,
    },
    examIcon: {
      width: 16,
      height: 16,
    },
  
    container: {
      flex: 1,
    },
  
    dashboard: {
      flex: 3,
      justifyContent: 'space-evenly',
    },
  
    list: {
      flex: 6,
    },
  
    // dashboard
    dashboardHeader: {
      marginVertical: 20,
      marginHorizontal: 24,
      fontSize: 22,
      fontWeight: 'bold',
      color: '#252525',
    },
    dashboardItemView: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginLeft: 18,
      marginRight: 8,
    },
    dashboardItem: {
      flex: 1,
      marginRight: 10,
  
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 15,
      justifyContent: 'space-evenly',
  
      shadowColor: 'rgb(0, 101, 255)',
      shadowOffset: {
        width: 0,
        height: 0.1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 20,
  
      elevation: 2,
    },
    dashboardItem_IndicatorName: {
      fontSize: 16,
      color: '#252525',
    },
    dashboardItem_IndicatorResultView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dashboardItem_IndicatorImage: {
      width: 16,
      height: 16,
      marginRight: 6,
    },
    dashboardItem_IndicatorResult: {
      fontSize: 17,
      fontWeight: 'bold',
      color: '#252525',
    },
  
    // dashboard
  
    //list
    listSemester: {
      marginHorizontal: 24,
      marginVertical: 20,
      color: '#0065FF',
      fontWeight: 'bold',
      fontSize: 16,
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
      // viền màu cam
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
    },
    listItem_SubjectName: {
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
      paddingVertical: 1,
    },
    listItem_ViewDetail_Text: {
      color: '#fff',
      fontSize: 13,
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
    // lichthiHeader: {
    //   display: 'flex',
    //   flexDirection: 'row',
    //   alignItems: 'center',
    // },
    // lichthiHeader_Text: {
    //   fontSize: 20,
    //   fontWeight: 'bold',
    //   color: '#252525',
    //   paddingVertical: 5,
    // },
    scoreHeader_Sort: {
      display: 'flex',
      flexDirection: 'row',
  
      alignSelf: 'flex-end',
    },
    btnSort: {
      borderColor: '#0065FF',
      borderRadius: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      marginRight: 40,

      minHeight: 38, 
      // fix chiều cao btnSort

    },
    btnSortContainer: {
      width: 120,
      height: 30,
      marginRight: 10,
      marginBottom: 10
    },
    btnSort_Text: {
      color: '#0065FF',
      fontSize: 15,
      fontFamily: "Roboto"
    },
    effect: {
      position: 'absolute',
      right: 0,
      top: 0,
  
      zIndex: 2,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: '#000000aa',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContainer: {
      width: '80%',
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
      left: '48%',
      top: -25,
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
      fontWeight: 'bold',
      textAlign: 'center'
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
      color: '#252525',
      fontSize: 16,
    },
    modalDetail_HeaderText: {
      fontSize: 16,
      
      fontWeight: 'bold',
      color: '#252525',
    },
    modalDetail_colContent: {
      minWidth: 150,
    },
    modalDetail_colPayAmount: {
      minWidth: 100,
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
    }
  });