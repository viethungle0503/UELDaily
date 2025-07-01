import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#F7F9FE',
      paddingHorizontal: 14,
      paddingTop: 14,
    },
    fixItem: {
      position: 'relative',
      top: 0,
      marginBottom: 20,
    },
    scrollItem: {},
    monthi: {
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: 10,
      marginBottom: 50,
    },
    examIcon: {
      width: 16,
      height: 16,
      marginRight: 5,
    },
    monthi_Item: {
      backgroundColor: '#fff',
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 15,
      marginBottom: 10,
  
      position: 'relative',
      shadowColor: 'rgb(0, 101, 255)',
      shadowOffset: {
        width: 0,
        height: 0.1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 20,
  
      elevation: 2,
    },
    monthi_Item_Markup: {
      // viền màu cam
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundColor: '#FF967C',
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
    },
    monthi_Item__SubjectName: {
      fontWeight: 'bold',
      fontSize: 15,
      color: '#252525',
  
      marginBottom: 5,
    },
    monthi_Item__Detail: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      fontSize: 16,
      marginVertical: 5,
    },
    monthi_Item__DetailTitle: {
      color: '#938F8F',
    },
    monthi_Item__DetailData: {
      color: '#000000',
    },
  
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'flex-start',
      marginTop: 12,
      marginRight: 10,
    },
    examScheduleHeader_Sort: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    btnSort: {
      borderColor: '#0065FF',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      marginRight: 50,
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
  });