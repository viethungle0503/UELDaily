import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
      position: 'relative',
      marginBottom:50, 
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
      
    },
    mediaItem_Image: {
      width: 45,
      aspectRatio: 1,
      borderRadius: 100,
      marginRight: 10,
    },
    mediaItem_Text: {
      borderBottomWidth: 2,
      borderColor: '#F0F0F0',
      paddingBottom: 25,
      
    },
    mediaDepartment: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    mediaDepartmentName: {
      width: '68%',
      fontWeight: '600',
      fontSize: 16,
      color: '#252525',
      // backgroundColor: 'red'
    },
    mediaLastestTime: {
      color:'rgba(147, 143, 143, 1)',
      width: '25%',
      textAlign: "right"
      // backgroundColor: 'green'
    },
    mediaLastestNews: {
      color: '#252525'
    },
  });