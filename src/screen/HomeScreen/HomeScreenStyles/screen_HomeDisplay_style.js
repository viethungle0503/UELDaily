import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
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
    backgroundColor: '#FFF',
    paddingHorizontal: 32,
    paddingBottom: 12,
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
    position: 'absolute',
    right: 30,
    top: 35,
    zIndex: 3,
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
    width: 105,
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

  // hoatdong: {
  //   flex: 4,
  //   backgroundColor: '#FFF',
  //   paddingHorizontal: 32,
  // },

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

  // modal ngôn ngữ trên Home

  /*change language popup  */
  modalHeading: {
    color: '#080B09',
    fontWeight: '600',
    paddingBottom: 5,
    paddingTop: 10,
    fontSize: 18,
  },
  modalText: {
    color: '#252525',
    fontWeight: '500',
    fontSize: 16,
  },
  langBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langContainer: {
    width: '75%',
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    paddingVertical: 20,

    borderRadius: 20,
    elevation: 20,
  },
  langNationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langNation_Vie: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  langNation_Eng: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  langNationIcon: {
    height: 25,
    aspectRatio: 0.9,
    marginRight: 10,
  },
  langSelectNationIcon: {
    width: 30,
    aspectRatio: 1,
    opacity: 0,
  },
  langFooter_ButtonClose: {
    backgroundColor: '#0065FF',

    color: '#0065FF',
    borderRadius: 8,
    width: '100%',
    height: 35,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  /*change language popup  */
});