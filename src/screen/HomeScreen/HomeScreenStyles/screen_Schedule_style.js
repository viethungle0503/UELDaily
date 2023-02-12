import { StyleSheet } from "react-native";
export default StyleSheet.create({
    itemContainer_delete: {
      borderLeftWidth: 1,
      borderColor: 'rgba(255, 204, 179, 0.4);',
      paddingLeft: 10,
      marginRight: 10,
      marginTop: 30,
      minHeight: 114,
    },
  
    item: {
      height: '100%',
      backgroundColor: '#ffffff',
      shadowColor: 'rgb(0, 101, 255)',
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 2,
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
    },
    emptyDate: {
      flex: 1,
      verticalAlign: 'center',
    },
    emptyText: {
      fontSize: 20,
      color:'red',
      marginTop: 35,
    },
  
    textLine: {
      fontSize: 14,
      display: 'flex',
      flexDirection: 'row',
    },
    textLabel: {
      // flex: 1,
      minWidth: 80,
    },
    textFocus: {
      color: 'black',
      // flex: 3,
    },
    courseName: {
      fontWeight: 'bold',
      color: 'red',
    },
    textRoom: {
      color: '#FF6E35',
    },
  });