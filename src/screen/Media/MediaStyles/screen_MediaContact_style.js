import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
      backgroundColor: '#fff',
      color: '#252525',
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 40
    },
    mediaContact_ImageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 30
    },
    mediaContact_Image: {
      width: 100,
      aspectRatio: 1,
      borderRadius: 100,
    },
  
    mediaContact_Info: {
      paddingVertical: 10,
    },
    mediaContact_InfoTitle: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    mediaContact_InfoTitleIcon: {
      width: 25,
      aspectRatio: 1,
      marginRight: 5
    },
    mediaContact_InfoTitleText: {
      color: '#625F5F',
      fontSize: 16,
    },
    mediaContact_InfoData: {
      color: '#252525',
      fontSize: 17,
      fontWeight: '500'
    },
  
  
  });