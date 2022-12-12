import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native';

export default function MediaNoti({navigation}) {
  const cheerio = require('cheerio');
  async function loadGraphicCards(
    searchUrl = `https://ctsv.uel.edu.vn/thong-bao-chung-5`,
    page = 1,
  ) {
    let bigPicture = [];
    let smallPicture =[];
    const baseURL = `https://ctsv.uel.edu.vn`;
    const response = await fetch(searchUrl); // fetch page
    const htmlString = await response.text(); // get response text
    const $ = cheerio.load(htmlString); // parse HTML string
    $('.PageColumns').remove();
    $('#ctl08_ctl01_RadListView1_ClientState').remove();
    $('#ctl08_ctl01_RadListView1').remove();
    $('.nd_news > div').each(function (i, div) {
      let title = $('h4 > a', div).text();
      let time = $('h4 > span', div).text();
      let imageURL = baseURL + $('img', div).attr('src');
      let link = baseURL + $('h4 > a', div).attr('href');
      if($('img',div).width() > 90) {
        bigPicture.push({title: title, time: time, imageURL: imageURL, link: link});
      }
      else {
        smallPicture.push({title: title, time: time, imageURL: imageURL, link: link});
      }
    });
  }
  return (
    <ScrollView style={styles.body}>

      <ScrollView style={styles.mediaNoti_Lastest} horizontal={true} showsHorizontalScrollIndicator={false}>
        {/* Slide 1 */}
        <TouchableOpacity style={styles.lastestItem}>
          <ImageBackground 
            imageStyle={{borderRadius: 10}}
            resizeMode='cover'
            source={require('../../assets/mediaNotiLastest.png')}
            style={styles.lastestItem_ImageContainer}>
            <LinearGradient
              colors={[
                'rgba(211, 212, 211, 0)',
                'rgba(63, 106, 191, 0.99)',
              ]}
              style={styles.lastestItem_linearGradient}>
            </LinearGradient>

            <View style={styles.lastestItem_Content}>

              <Text style={[styles.lastestItem_ContentText,{
                  fontSize: 17,
                  fontWeight: '600'
                }]}>
                Chương trình Học bổng Jabil Việt Nam 2023
              </Text>

              <Text style={styles.lastestItem_ContentText}>Công ty Jabil Việt Nam tọa lạc tại Khu Công Nghệ Cao (SHTP)...</Text>

              <View style={styles.row}>
                <Image style={styles.mediaNotiItem_DepartmentImage}
                  source={require('../../assets/mediaItemImage.png')}>
                </Image>
                <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;P. TS&CTSV</Text>
                <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;20 giờ</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
                {/* Slide 2 */}
        <TouchableOpacity style={styles.lastestItem}>
          <ImageBackground 
            imageStyle={{borderRadius: 10}}
            resizeMode='cover'
            source={require('../../assets/mediaNotiLastest2.png')}
            style={styles.lastestItem_ImageContainer}>
            <LinearGradient
              colors={[
                'rgba(211, 212, 211, 0)',
                'rgba(63, 106, 191, 0.99)',
              ]}
              style={styles.lastestItem_linearGradient}>
            </LinearGradient>

            <View style={styles.lastestItem_Content}>

              <Text style={[styles.lastestItem_ContentText, {
                  fontSize: 17,
                  fontWeight: '600'
                }]}>
                Học bổng Đồng Hành Singapore kỳ 43
              </Text>

              <Text style={styles.lastestItem_ContentText}>Phòng Công tác sinh viên thông báo về chương trình học bổng Đồng ...</Text>

              <View style={styles.row}>
                <Image style={styles.mediaNotiItem_DepartmentImage}
                  source={require('../../assets/mediaItemImage.png')}>
                </Image>
                <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;P. TS&CTSV</Text>
                <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;20 giờ</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
                {/* Slide 3 */}
        <TouchableOpacity style={styles.lastestItem}>
          <ImageBackground 
            imageStyle={{borderRadius: 10}}
            resizeMode='cover'
            source={require('../../assets/mediaNotiLastest3.png')}
            style={styles.lastestItem_ImageContainer}>
            <LinearGradient
              colors={[
                'rgba(211, 212, 211, 0)',
                'rgba(63, 106, 191, 0.99)',
              ]}
              style={styles.lastestItem_linearGradient}>
            </LinearGradient>

            <View style={styles.lastestItem_Content}>

              <Text style={[styles.lastestItem_ContentText, {
                  fontSize: 17,
                  fontWeight: '600'
                }]}>
                WORKSHOP VÀ CUỘC THI CÔNG NGHỆ EXPERT CHALLENGE MÙA 4
              </Text>

              <Text style={styles.lastestItem_ContentText}>Nhằm tạo sân chơi cho các bạn sinh viên đam mê công nghệ...</Text>

              <View style={styles.row}>
                <Image style={styles.mediaNotiItem_DepartmentImage}
                  source={require('../../assets/mediaItemImage.png')}>
                </Image>
                <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;P. TS&CTSV</Text>
                <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;20 giờ</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

      </ScrollView>

      <View style={styles.mediaNoti_All}>
        <Text style={styles.mediaNotiHeader}>Tổng hợp</Text>
                {/* Tin 1 */}
        <TouchableOpacity
          style={styles.mediaNotiItem}
          onPress={() => {}}>
          <Image style={styles.mediaNotiItem_Image} source={require('../../assets/mediaNotiAll.png')} />

          <View style={styles.mediaNotiItem_Content}>

            <Text style={styles.mediaNotiItem_ContentTitle}>Danh sách sinh viên được gia hạn học phí</Text>

            <View style={styles.row}>
              <Image style={styles.mediaNotiItem_DepartmentImage}
                source={require('../../assets/mediaItemImage.png')}>
              </Image>
              <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;P. TS&CTSV</Text>
              <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;21/11/2022</Text>
            </View>

          </View>
        </TouchableOpacity>
                {/* Tin 2 */}
        <TouchableOpacity
          style={styles.mediaNotiItem}
          onPress={() => {}}>
          <Image style={styles.mediaNotiItem_Image} source={require('../../assets/mediaNotiAll2.png')} />

          <View style={styles.mediaNotiItem_Content}>

            <Text style={styles.mediaNotiItem_ContentTitle}>Thông báo lịch học Tuần sinh hoạt công dân - sinh viên năm học... </Text>

            <View style={styles.row}>
              <Image style={styles.mediaNotiItem_DepartmentImage}
                source={require('../../assets/mediaItemImage.png')}>
              </Image>
              <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;P. TS&CTSV</Text>
              <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;14/11/2022</Text>
            </View>
          </View>
        </TouchableOpacity>
                {/* Tin 3 */}
        <TouchableOpacity
          style={styles.mediaNotiItem}
          onPress={() => {}}>
          <Image style={styles.mediaNotiItem_Image} source={require('../../assets/mediaNotiAll2.png')} />

          <View style={styles.mediaNotiItem_Content}>

            <Text style={styles.mediaNotiItem_ContentTitle}>Thông báo lịch học Tuần sinh hoạt công dân - sinh viên năm học... </Text>

            <View style={styles.row}>
              <Image style={styles.mediaNotiItem_DepartmentImage}
                source={require('../../assets/mediaItemImage.png')}>
              </Image>
              <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;P. TS&CTSV</Text>
              <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;14/11/2022</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* Tin 4 */}
        <TouchableOpacity
          style={styles.mediaNotiItem}
          onPress={() => {}}>
          <Image style={styles.mediaNotiItem_Image} source={require('../../assets/mediaNotiAll2.png')} />

          <View style={styles.mediaNotiItem_Content}>

            <Text style={styles.mediaNotiItem_ContentTitle}>Thông báo lịch học Tuần sinh hoạt công dân - sinh viên năm học... </Text>

            <View style={styles.row}>
              <Image style={styles.mediaNotiItem_DepartmentImage}
                source={require('../../assets/mediaItemImage.png')}>
              </Image>
              <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;P. TS&CTSV</Text>
              <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;14/11/2022</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    // paddingHorizontal: 20,
  },
  lastestItem:{
    maxWidth: 220,
    maxHeight: '100%',
    flexDirection: 'column',
    marginRight: 7
  },
  lastestItem_ImageContainer:{
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  lastestItem_linearGradient:{
    borderRadius: 10,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  lastestItem_Content:{
    marginHorizontal: 8,
    marginBottom: 15
  },
  lastestItem_ContentText:{
    color: 'white',
    paddingBottom: 3
  },
  mediaNoti_Lastest:{
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    flexDirection: 'row',
    height: 300,
  },
  mediaNoti_All:{
    flex: 1,
    marginHorizontal: 20,
  },
  
  mediaNotiItem:{
    flexDirection: 'row',
    marginBottom: 10,
  },
  mediaNotiHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252525',
    paddingVertical: 16,
  },
  mediaNotiItem_ContentTitle: {
    display: 'flex',
    fontSize: 15,
    fontWeight: '500',
    color: '#252525',
    marginRight: 32,
    textAlign: 'justify',
  },
  mediaNotiItem_Content: {
    paddingRight: 32,
    marginRight: 52,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 7
  },
  mediaNotiItem_DepartmentImage:{
    borderRadius: 100,
    width: 20,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  mediaNotiItem_ContentDepartment:{
    color: '#FF6E35'
  },
  mediaNotiItem_ContentTime: {
    marginLeft: 5,
  },
  mediaNotiItem_Image: {
    width: 110,
    height: 75,
    borderRadius: 4,
    marginRight: 10, //cách hình
  },
  row:{
    flexDirection: 'row'
  }

});
