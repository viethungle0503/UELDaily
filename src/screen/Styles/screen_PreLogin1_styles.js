import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  sectionHeader: {
    flex: 1
  },
  sectionIllustration: {
    flex: 5,
    alignItems: 'center',
  },
  sectionText: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  sectionFooter: {
    flex: 1,
    justifyContent: 'flex-start'

  },
  sectionIllustration_Image: {
    aspectRatio: 0.8,
    flex: 1,
    resizeMode: 'contain',
  },
  sectionText_Title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 25,
  },
  sectionText_DescriptionView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionText_DescriptionText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#344161CC',
  },
  readProgressView: {
    width: 45,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  readProgress: {
    opacity: 1,
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },
  btnStartView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 40,
  },

  btnStart: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',

    borderRadius: 8,
    backgroundColor: '#0065FF',
    paddingVertical: 12,
  },
  btnStartText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

