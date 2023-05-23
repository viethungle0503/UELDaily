import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 14,
  },
  noti: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 200,
    backgroundColor: '#F7F9FE',
    borderRadius: 10,
    marginBottom: 50,
  },
  notiItem: {
    // flex: 1,
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
  notiItem_Icon: {
    flex: 1,
    paddingTop: 2,
  },
  notiItem_Content: {
    flex: 6,
    paddingLeft: 6,
  },
  notiItem_Content_Title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#080B09',
    width: '95%',
  },
  notiItem_Content_ActionTime: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  notiItem_Status: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  notiItem_Status_ReadIcon: {
    opacity: 1,
    width: 10,
    height: 10,
    borderRadius: 100,
  },
});
