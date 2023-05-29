import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 14,
    // marginBottom: 50
  },
  fixItem: {
    position: 'relative',
    top: 0,
  },
  noti: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 20,
    // paddingTop: 10,
    // paddingBottom: 200,
    backgroundColor: '#F7F9FE',
    borderRadius: 10,
    marginBottom: 50
  },
  notiItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginVertical: 4,
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
    position: 'absolute',
    top: 20,
    right: 20,
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
    flexDirection: 'row',
    backgroundColor: '#F7F9FE',
    height: 40,
    borderRadius: 10,

    justifyContent: 'center',
  },
  notiHeader_Sort_btnActive: {
    width: '33%',
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
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Modal Section
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  modalEffectLeft: {
    position: 'absolute',
    top: '60%',
    left: 0,
  },
  modalEffectRight: {
    position: 'absolute',
    bottom: '10%',
    right: 0,
  },

  btnBackContainer: {
    padding: 10,
  },

  modalHeader: {
    paddingHorizontal: 20,
  },

  responseItem: {
    backgroundColor: '#F7F9FE',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 15,
    padding: 20,

  },

  modalHeader_TitleText: {
    fontSize: 20,
    color: '#252525',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'justify',
  },

  modalHeader_Department: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalHeader_Icon: {
    width: 42,
    aspectRatio: 1,
    marginRight: 12,
  },
  modalHeader_DepartmentName: {
    fontSize: 18,
    color: '#252525',
  },
  modalHeader_DepartmentMail: {
    fontSize: 15,
    color: '#252525',
  },

  modalContent: {
   
  },
  modalContentText: {
    color: '#252525',
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'justify',
    // marginTop: 8
  },
  userAvatar:{
    width: 45,
    height:45,
    aspectRatio: 1,
    borderRadius: 100,
  },
  btnResponseEmail:{
    width: 25, 
    height: 25
  },



  btnResponse: {
    paddingHorizontal: 35,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#0065FF',

    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  btnResponseText: {
    color: '#FFF',
    fontSize: 17,
  },
  // row:{
  //   flexDirection: 'row',
  //   justifyContent: 'space-between'
  // }
});
