import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 14,
      // paddingTop: 10,
    },
  
    noti: {
      display: 'flex',
      flexDirection: 'column',
      // paddingVertical: 20,
      paddingHorizontal: 15,
      paddingTop: 10,
      paddingBottom: 200,
  
      // marginVertical: 20,
      backgroundColor: '#F7F9FE',
      borderRadius: 10,
      marginBottom: 50,
    },
    notiItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
  
      marginBottom: 5,
  
      shadowColor: 'rgb(0, 101, 255)',
      shadowOffset: {
        width: 0,
        height: 0.1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 20,
  
      elevation: 2,
  
      position: 'relative',
    },
    fadeItem: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 5,
      zIndex: 1,
    },
  
    notiItem_Icon: {
      flex: 1,
      paddingTop: 2,
    },
    notiItem_Content: {
      flex: 6,
      paddingLeft: 6,
    },
    notiItem_Status: {
      // flex: 1,
      // justifyContent: 'space-between',
      // alignItems: 'flex-end',
      position:'absolute',
      top: 20,
      right: 20,
    },
    notiItem_Content_Title: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#080B09',
    },
    notiItem_Content_Describe: {
      color: 'red',
    },
    notiItem_Content_ActionTime: {
      paddingTop: 5,
      flexDirection: "row",
      justifyContent: 'space-between',
    },
  
    notiItem_Status_ReadIcon: {
      opacity: 1,
      width: 10,
      height: 10,
  
      borderRadius: 100,
    },
  
    notiHeader_Text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#252525',
      paddingVertical: 5,
    },
    notiHeader_Sort: {
      // display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#F7F9FE',
      height: 40,
      borderRadius: 10,
  
      justifyContent: 'center',
    },
    notiHeader_Sort_btnActive: {
      width: '33%',
      // alignSelf: 'stretch',
  
      justifyContent: 'center',
      alignItems: 'center',
  
      borderRadius: 10,
      backgroundColor: '#fff',
      color: '#0065FF',
  
      shadowColor: 'rgb(51, 132, 255)',
      shadowOffset: {
        width: 0,
        height: 0.1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 20,
  
      elevation: 2,
    },
    notiHeader_Sort_btnNotPress: {
      width: '33%',
      // alignSelf: 'stretch',
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    effect: {
      position: 'absolute',
      right: 0,
      top: 0,
  
      zIndex: 2,
    },
    col: {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'flex-start',
      // justifyContent: 'space-around',
    },
    row: {
      display: 'flex',
      // flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
  
      // alignContent: 'flex-end',
      // marginTop: 12,
      // marginRight: 10,
      // overflow: 'hidden'
    },



  
    // Modal Section
    modalContainer: {
      flex: 1,
      backgroundColor: '#FFF',
      position: 'relative',
    },
    modalEffectLeft:{
      position: 'absolute',
      top: '60%',
      left: 0
    },
    modalEffectRight:{
      position: 'absolute',
      bottom: '10%',
      right: 0
    },

    btnBackContainer: {
      padding: 10,
    },
   
    modalHeader: {
      paddingHorizontal: 20,
    },

    modalHeader_TitleText:{
      fontSize: 20,
      color: '#252525',
      fontWeight: '600',
      marginBottom: 15,
      textAlign: 'justify'
    },

    modalHeader_Department:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    modalHeader_Icon:{
      width: 42,
      aspectRatio: 1,
      marginRight: 12,

    },
    modalHeader_DepartmentName:{
      fontSize: 18,
      color: '#252525',
    },
    modalHeader_DepartmentMail:{
      fontSize: 15,
      color: '#252525',
    },

    modalContent:{
      backgroundColor: '#F7F9FE',
      borderRadius: 10,
      margin: 15,
      padding: 20,
    }, 
    modalContentText:{
      color: '#252525',
      fontSize: 17, 
      fontWeight: '400',
      lineHeight: 20,
      textAlign: 'justify'
    },
    btnResponse:{
      paddingHorizontal: 35,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: '#0065FF',

      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginRight: 15,
    },
    btnResponseText:{
      color: '#FFF',
      fontSize: 17,
    },
  });