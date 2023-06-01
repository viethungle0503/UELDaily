import { StyleSheet } from "react-native"; 
export default StyleSheet.create({
  /* user info */
  modalContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    position: 'relative',
  },
  modalEffect: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  effectLeft: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    zIndex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  modalHeader_btnBackContainer: {
    width: 25,
  },
  modalHeader_btnBack: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  modalHeader_Title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#252525',
    paddingHorizontal: 10,
  },
  modalContent: {
    flex: 1,
  },
  modalContentItem: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },
  modalContentItem_Icon: {
    width: 35,
    aspectRatio: 1,
    marginRight: 8,
  },
  modalContentItem_RowInfo: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingBottom: 10,
    width: '100%',
  },
  modalContentItem_RowInfo_Title: {
    marginRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: '#938F8F',
    fontSize: 16,
    width: '30%',
  },
  modalContentItem_RowInfo_Data: {
    color: '#252525',
    fontWeight: '500',
    fontSize: 16,
    width: '70%',
  },
  /* user info */

  /* font  */
  accountHeading: {
    color: '#080B09',
    fontWeight: '600',
    paddingBottom: 5,
    paddingTop: 10,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})