import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
      marginBottom: 50
    },
    lastestItem: {
      maxWidth: 220,
      maxHeight: '100%',
      flexDirection: 'column',
      marginLeft: 17,
    
    },
    lastestItem_ImageContainer: {
      height: '100%',
      justifyContent: 'flex-end',
      position: 'relative',
    },
    lastestItem_linearGradient: {
      borderRadius: 10,
      backgroundColor: "transparent",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    lastestItem_Content: {
      marginHorizontal: 8,
      marginBottom: 15
    },
    lastestItem_ContentText: {
      color: '#FFF',
      paddingBottom: 3
    },
    mediaNoti_Lastest: {
      height: 300,
      marginTop: 20,
    },
    mediaNoti_All: {
      marginHorizontal: 20,
    },
  
    mediaNotiItem: {
      flexDirection: 'row',
      marginBottom: 10,
      marginHorizontal: 20,
    },
    mediaNotiHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#252525',
      paddingVertical: 16,
    },
    mediaNotiItem_ContentTitle: {
      display: 'flex',
      fontSize: 15,
      fontWeight: '500',
      color: '#252525',
      marginRight: 32,
      textAlign: 'justify',
    },
    mediaNotiItem_Content: {
      // paddingRight: 32,
      // marginRight: 52,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: 7,
      width: '75%'
    },
    mediaNotiItem_DepartmentImage: {
      borderRadius: 100,
      width: 20,
      aspectRatio: 1,
      resizeMode: 'contain',
      marginRight: 5,
      alignItems: 'center'
    },
    mediaNotiItem_ContentDepartment: {
      color: '#FF6E35',
      width: '40%'
    },
    mediaNotiItem_ContentTime: {
      // marginLeft: 5,
      color: '#433D3D',
      width: '50%'
    },
    mediaNotiItem_Image: {
      width: 110,
      height: 75,
      borderRadius: 4,
      marginRight: 10, //cách hình
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  
  });