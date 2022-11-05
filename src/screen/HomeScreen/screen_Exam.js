import {
  Image,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Exam({navigation}) {
  return (
    <View style={styles.body}>
      {/* header lịch thi */}
      <View style={styles.fixItem}>
        <View style={styles.lichthiHeader_Sort}>
          <TouchableOpacity style={styles.btnSort}>
            <Text style={styles.btnSort_Text}>Năm học</Text>
            <Image source={require('../../assets/btnSortIcon.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSort}>
            <Text style={styles.btnSort_Text}>Học kỳ</Text>
            <Image source={require('../../assets/btnSortIcon.png')} />
          </TouchableOpacity>
        </View>
      </View>
      {/* row lịch thi */}

      <ScrollView style={styles.monthi}>
        <View style={styles.monthi_Item}>
          <View style={styles.monthi_Item_Markup}></View>

          <Text style={styles.monthi_Item__SubjectName}>
            Phân tích thiết kế HTTT quản lý - 221IS4204
          </Text>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/ngaythi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Ngày thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>20/12/2022</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/thoigianthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Thời gian: </Text>
            <Text style={styles.monthi_Item__DetailData}>08:20</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/phongthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Phòng thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>A305</Text>
          </View>
        </View>

        <View style={styles.monthi_Item}>
          <View style={styles.monthi_Item_Markup}></View>

          <Text style={styles.monthi_Item__SubjectName}>
            Phát triển web kinh doanh - 221MI2602
          </Text>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/ngaythi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Ngày thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>22/12/2022</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/thoigianthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Thời gian: </Text>
            <Text style={styles.monthi_Item__DetailData}>09:30</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/phongthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Phòng thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>A707</Text>
          </View>
        </View>

        <View style={styles.monthi_Item}>
          <View style={styles.monthi_Item_Markup}></View>

          <Text style={styles.monthi_Item__SubjectName}>
            Hệ quản trị cơ sở dữ liệu - 221MI6602
          </Text>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/ngaythi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Ngày thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>20/12/2022</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/thoigianthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Thời gian: </Text>
            <Text style={styles.monthi_Item__DetailData}>14:30</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/phongthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Phòng thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>A503</Text>
          </View>
        </View>

        <View style={styles.monthi_Item}>
          <View style={styles.monthi_Item_Markup}></View>

          <Text style={styles.monthi_Item__SubjectName}>
            Quản trị nguồn nhân lực - 221QT0402
          </Text>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/ngaythi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Ngày thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>24/12/2022</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/thoigianthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Thời gian: </Text>
            <Text style={styles.monthi_Item__DetailData}>09:30</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/phongthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Phòng thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>A503</Text>
          </View>
        </View>

        <View style={styles.monthi_Item}>
          <View style={styles.monthi_Item_Markup}></View>

          <Text style={styles.monthi_Item__SubjectName}>
            Tích hợp qui trình K/Doanh với các hệ thống ERP 1 - 221IS4602
          </Text>
          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/ngaythi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Ngày thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>25/12/2022</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/thoigianthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Thời gian: </Text>
            <Text style={styles.monthi_Item__DetailData}>09:30</Text>
          </View>

          <View style={styles.monthi_Item__Detail}>
            <Image source={require('../../assets/phongthi.png')}></Image>
            <Text style={styles.monthi_Item__DetailTitle}> Phòng thi: </Text>
            <Text style={styles.monthi_Item__DetailData}>A503</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F7F9FE',
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  fixItem: {
    position: 'relative',
    top: 0,
    marginBottom: 20,
  },
  scrollItem: {},
  monthi: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginBottom: 0,
  },
  monthi_Item: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,

    marginBottom: 10,

    position: 'relative',
    shadowColor: 'rgb(0, 101, 255)',
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,

    elevation: 2,
  },
  monthi_Item_Markup: {
    // viền màu cam

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 6,
    backgroundColor: '#FF967C',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  monthi_Item__SubjectName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#080B09',

    marginBottom: 5,
  },
  monthi_Item__Detail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    fontSize: 15,
    marginVertical: 5,
  },
  monthi_Item__DetailTitle: {
    color: '#938F8F',
  },
  monthi_Item__DetailData: {
    color: '#000000',
  },

  col: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  row: {
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    marginTop: 12,
    marginRight: 10,
    // overflow: 'hidden'
  },
  lichthiHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lichthiHeader_Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    paddingVertical: 5,
  },
  lichthiHeader_Sort: {
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'flex-end',
  },
  btnSort: {
    borderColor: '#0065FF',
    borderRadius: 8,

    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginLeft: 10,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSort_Text: {
    color: '#0065FF',
    paddingRight: 7,
  },

  effect: {
    position: 'absolute',
    right: 0,
    top: 0,

    zIndex: 2,
  },
});
