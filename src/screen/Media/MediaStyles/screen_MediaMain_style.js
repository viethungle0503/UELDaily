import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
      position: 'relative',
    },
    // open item
    effectLeft: {
      position: 'absolute',
      top: 250,
      left: 0,
    },
    effectRightBottom: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
  
    mediaItem: {
      // height: 80,
      flexDirection: 'row',
      // flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginHorizontal: 20,
      marginVertical: 10,
      paddingRight: 10,
    },
    mediaItem_Image: {
      width: 45,
      aspectRatio: 1,
      borderRadius: 100,
      marginRight: 10,
    },
    mediaItem_Text: {
      flexDirection: 'column',
      borderBottomWidth: 2,
      borderColor: '#F0F0F0',
      justifyContent: 'space-between',
      paddingBottom: 25,
      // paddingHorizontal: 10,
    },
    mediaDepartment: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    mediaDepartmentName: {
      width: '80%',
      fontWeight: '600',
      fontSize: 16,
      color: 'red'
    },
    mediaLastestTime: {
      color:'blue',
    },
    mediaLastestNews: {
      color:'green',
    },
  });