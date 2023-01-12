import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Information({navigation}) {
  return (
    <View style={styles.body}>
      {/* <View style={styles.fixItem}>
        <View style={styles.notiHeader_Sort}>
          <TouchableOpacity style={styles.notiHeader_Sort_btnActive}>
            <Text
              style={[
                styles.notiHeader_Text,
                {
                  color: '#0065FF',
                },
              ]}>
              Tất cả
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notiHeader_Sort_btnNotPress}>
            <Text style={styles.notiHeader_Text}>Nhắc nhở</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notiHeader_Sort_btnNotPress}>
            <Text style={styles.notiHeader_Text}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <ScrollView style={styles.noti} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.notiItem}
          onPress={() => navigation.navigate('Homework')}>
          <View style={styles.notiItem_Icon}>
            <Image source={require('../../assets/notiNhacnho.png')} />
          </View>

          <View style={styles.notiItem_Content}>
            <Text style={styles.notiItem_Content_Title}>
              Sắp đến hạn Bài tập 3, môn Phát triển web kinh doanh
            </Text>
            <TouchableOpacity
              style={styles.notiItem_Content_Action}
              onPress={() => navigation.navigate('Homework')}>
              <Text
                style={[
                  styles.notiItem_Content_ActionText,
                  {
                    color: '#FF6E35',
                  },
                ]}>
                Xem ngay
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notiItem_Status}>
            <View
              style={[
                styles.notiItem_Status_ReadIcon,
                {
                  backgroundColor: '#FF6E35',
                },
              ]}></View>

            <View style={styles.row}>
              <Image source={require('../../assets/notiHistory.png')} />
              <Text>&nbsp;9h</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notiItem}
          onPress={() => navigation.navigate('Homework')}>
          <View style={styles.fadeItem}></View>

          <View style={styles.notiItem_Icon}>
            <Image source={require('../../assets/notiNhacnho.png')} />
          </View>

          <View style={styles.notiItem_Content}>
            <Text style={styles.notiItem_Content_Title}>
              Sắp đến hạn Bài tập 2, môn Phát triển web kinh doanh
            </Text>
            <TouchableOpacity
              style={styles.notiItem_Content_Action}
              onPress={() => navigation.navigate('Homework')}>
              <Text
                style={[
                  styles.notiItem_Content_ActionText,
                  {
                    color: '#FF6E35',
                  },
                ]}>
                Xem ngay
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notiItem_Status}>
            <View
              style={[
                styles.notiItem_Status_ReadIcon,
                {
                  backgroundColor: '#FF6E35',
                  opacity: 0,
                },
              ]}></View>

            <View style={styles.row}>
              <Image source={require('../../assets/notiHistory.png')} />
              <Text>&nbsp;20h</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notiItem}
          onPress={() => navigation.navigate('Homework')}>
          <View style={styles.fadeItem}></View>

          <View style={styles.notiItem_Icon}>
            <Image source={require('../../assets/notiNhacnho.png')} />
          </View>

          <View style={styles.notiItem_Content}>
            <Text style={styles.notiItem_Content_Title}>
              Sắp đến hạn Object definition, môn Phân tích và thiết kế HTTT quản
              lý
            </Text>
            <TouchableOpacity
              style={styles.notiItem_Content_Action}
              onPress={() => navigation.navigate('Homework')}>
              <Text
                style={[
                  styles.notiItem_Content_ActionText,
                  {
                    color: '#FF6E35',
                  },
                ]}>
                Xem ngay
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notiItem_Status}>
            <View
              style={[
                styles.notiItem_Status_ReadIcon,
                {
                  backgroundColor: '#FF6E35',
                  opacity: 0,
                },
              ]}></View>

            <View style={styles.row}>
              <Image source={require('../../assets/notiHistory.png')} />
              <Text>&nbsp;1d</Text>
            </View>
          </View>
        </TouchableOpacity>


        <View style={styles.notiItem}>
          <View style={styles.notiItem_Icon}>
            <Image source={require('../../assets/notiCapnhat.png')} />
          </View>

          <View style={styles.notiItem_Content}>
            <Text style={styles.notiItem_Content_Title}>
              [UEL SPACE]- [UEL SPACE’S HALLOWEEN PARTY]
            </Text>

            <Text style={styles.notiItem_Content_Describe}>
              Thân chào các bạn sinh viên, Chỉ còn ít ngày nữa thôi,
              Halloween...
            </Text>

            <TouchableOpacity style={styles.notiItem_Content_Action}>
              <Text
                style={[
                  styles.notiItem_Content_ActionText,
                  {
                    color: '#0065FF',
                  },
                ]}>
                Startup and Language Space UEL
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notiItem_Status}>
            <View
              style={[
                styles.notiItem_Status_ReadIcon,
                {
                  backgroundColor: '#0065FF',
                },
              ]}></View>
            <View style={styles.row}>
              <Image source={require('../../assets/notiHistory.png')} />
              <Text>&nbsp;1d</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.notiItem}
          onPress={() => navigation.navigate('Scoreboard')}>
          <View style={styles.fadeItem}></View>
          <View style={styles.notiItem_Icon}>
            <Image source={require('../../assets/notiNhacnho.png')} />
          </View>

          <View style={styles.notiItem_Content}>
            <Text style={styles.notiItem_Content_Title}>
              Thông báo có điểm thi môn Hệ thống thông tin quản lý
            </Text>
            <TouchableOpacity
              style={styles.notiItem_Content_Action}
              onPress={() => navigation.navigate('ScoreBoard')}>
              <Text
                style={[
                  styles.notiItem_Content_ActionText,
                  {
                    color: '#FF6E35',
                  },
                ]}>
                Xem ngay
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notiItem_Status}>
            <View
              style={[
                styles.notiItem_Status_ReadIcon,
                {
                  backgroundColor: '#FF6E35',
                  opacity: 0,
                },
              ]}></View>

            <View style={styles.row}>
              <Image source={require('../../assets/notiHistory.png')} />
              <Text>&nbsp;2d</Text>
            </View>
          </View>
        </TouchableOpacity>


        <View style={styles.notiItem}>
          <View style={styles.notiItem_Icon}>
            <Image source={require('../../assets/notiCapnhat.png')} />
          </View>

          <View style={styles.notiItem_Content}>
            <Text style={styles.notiItem_Content_Title}>
              Về việc đóng học phí HK1 ( 2022 - 2023)
            </Text>

            <Text style={styles.notiItem_Content_Describe}>
              Thân chào các bạn sinh viên, Phòng Tài chính đang thực hiện...
            </Text>

            <TouchableOpacity style={styles.notiItem_Content_Action}>
              <Text
                style={[
                  styles.notiItem_Content_ActionText,
                  {
                    color: '#0065FF',
                  },
                ]}>
                Phòng Tài chính UEL
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notiItem_Status}>
            <View
              style={[
                styles.notiItem_Status_ReadIcon,
                {
                  backgroundColor: '#0065FF',
                },
              ]}></View>
            <View style={styles.row}>
              <Image source={require('../../assets/notiHistory.png')} />
              <Text>&nbsp;1d</Text>
            </View>
          </View>
        </View>
        <View style={styles.notiItem}>
          <View style={styles.notiItem_Icon}>
            <Image source={require('../../assets/notiCapnhat.png')} />
          </View>

          <View style={styles.notiItem_Content}>
            <Text style={styles.notiItem_Content_Title}>
              Về việc đóng học phí HK1 ( 2022 - 2023)
            </Text>

            <Text style={styles.notiItem_Content_Describe}>
              Thân chào các bạn sinh viên, Phòng Tài chính đang thực hiện...
            </Text>

            <TouchableOpacity style={styles.notiItem_Content_Action}>
              <Text
                style={[
                  styles.notiItem_Content_ActionText,
                  {
                    color: '#0065FF',
                  },
                ]}>
                Phòng Tài chính UEL
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notiItem_Status}>
            <View
              style={[
                styles.notiItem_Status_ReadIcon,
                {
                  backgroundColor: '#0065FF',
                },
              ]}></View>
            <View style={styles.row}>
              <Image source={require('../../assets/notiHistory.png')} />
              <Text>&nbsp;1d</Text>
            </View>
          </View>
        </View>
        <View style={styles.notiItem}>
          <View style={styles.notiItem_Icon}>
            <Image source={require('../../assets/notiCapnhat.png')} />
          </View>

          <View style={styles.notiItem_Content}>
            <Text style={styles.notiItem_Content_Title}>
              Về việc đóng học phí HK1 ( 2022 - 2023)
            </Text>

            <Text style={styles.notiItem_Content_Describe}>
              Thân chào các bạn sinh viên, Phòng Tài chính đang thực hiện...
            </Text>

            <TouchableOpacity style={styles.notiItem_Content_Action}>
              <Text
                style={[
                  styles.notiItem_Content_ActionText,
                  {
                    color: '#0065FF',
                  },
                ]}>
                Phòng Tài chính UEL
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notiItem_Status}>
            <View
              style={[
                styles.notiItem_Status_ReadIcon,
                {
                  backgroundColor: '#0065FF',
                },
              ]}></View>
            <View style={styles.row}>
              <Image source={require('../../assets/notiHistory.png')} />
              <Text>&nbsp;1d</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 14,

    
    // paddingTop: 10,
  },
  fixItem: {
    position: 'relative',
    top: 0,
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
    flex: 1,
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
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  notiItem_Content_Title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#080B09',
  },
  notiItem_Content_Action: {
    paddingTop: 5,
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
    // display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F7F9FE',
    height: 40,
    borderRadius: 10,

    justifyContent: 'center',
  },
  notiHeader_Sort_btnActive: {
    width: '33%',
    // alignSelf: 'stretch',

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
    // alignSelf: 'stretch',

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
    // alignItems: 'flex-start',
    // justifyContent: 'space-around',
  },
  row: {
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',

    // alignContent: 'flex-end',
    // marginTop: 12,
    // marginRight: 10,
    // overflow: 'hidden'
  },
});
