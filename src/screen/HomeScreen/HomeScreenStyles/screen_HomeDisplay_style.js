import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
      flex: 1,
      flexDirection: 'column',
      marginBottom: 50,
    },
  
    col: {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'flex-start',
      justifyContent: 'space-around',
    },
    timeBlock: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'flex-start',
      marginTop: 5,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'flex-start',
      marginTop: 12,
    },
  
    studentwelcome: {
      height: 140,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      flex: 1,
      zIndex: 1,
      padding: 30,
      position: 'relative',
      backgroundColor: '#D0E0FF',
    },
    studentName: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#252525',
    },
    studentAvatar: {
      width: 40,
      height: 40,
      borderRadius: 100,
      marginRight: 10,
    },
    btnLanguage: {
      backgroundColor: 'red',
      position: 'absolute',
      right: 30,
      top: 35,
      zIndex: 1000,
      // borderWidth: 1,
      // borderStyle: 'solid',
      // borderRadius: 5,
      // borderColor: '#D9D9D9',
      // backgroundColor: '#fff',
    },
    svgLanguage: {
      color: 'black',
    },
    effect: {
      position: 'absolute',
      right: 0,
      top: 0,
  
      zIndex: 2,
    },
  
    tienich: {
      flex: 2,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 32,
      paddingBottom: 20,
      paddingHorizontal: 30,
      backgroundColor: '#fff',
      zIndex: 3,
      marginTop: -50,
    },
    tienichHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tienichIcon__ItemImg: {
      height: 32,
      width: 32,
    },
    tienichIcon: {
      display: 'flex',
      flexDirection: 'row',
      // marginHorizontal: 10,
      // justifyContent: 'center',
      marginVertical: 15,
      // marginHorizontal: 5,
      marginBottom: 0,
      // width: 100,
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'space-between',
    },
    tienichIcon_Item: {
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
      width: 100,
    },
    tienichIcon__Item: {
      // display: 'flex',
    },
    tienichIcon__ItemIcon: {
      display: 'flex',
      justifyContent: 'center',
      // width: '100%',
      textAlignVertical: 'center',
    },
    tienichIcon__ItemText: {
      fontSize: 18,
      textAlign: 'center',
      // flexWrap: 'wrap',
      textAlignVertical: 'top',
      color: '#000000',
    },
    btnAllTienich: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 5,
      borderColor: '#D9D9D9',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 5,
  
      display: 'flex',
      // flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    tienichText: {
      // color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#252525',
    },
  
    hoatdong: {
      flex: 4,
      backgroundColor: '#FFF',
      // marginTop: 10,
      // paddingTop: 30,
      paddingHorizontal: 32,
      paddingBottom: 30,
    },
  
    shape: {
      height: 8,
    },
    hoatdongHeader: {
      // display: block,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#252525',
      paddingHorizontal: 32,
      paddingVertical: 16,
      backgroundColor: 'white',
    },
    hoatdongTitle: {
      display: 'flex',
      fontSize: 15,
      fontWeight: '500',
      color: '#252525',
      marginRight: 32,
      textAlign: 'justify',
    },
    contentMain: {
      paddingRight: 32,
      marginRight: 52,
    },
    hoatdongTime: {
      marginLeft: 5,
      color: '#938F8F',
    },
    iconTime: {
      width: 16,
      height: 16,
    },
    hoatdongImage: {
      width: 110,
      height: 75,
      borderRadius: 4,
      marginRight: 10, //cách hình
    },
  });