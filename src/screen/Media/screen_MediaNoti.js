import { useEffect, useState, useRef } from 'react';
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
import { useDispatch } from 'react-redux';
import { setNews_Departments } from '../../redux_toolkit/newsSlice';
import LinearGradient from 'react-native-linear-gradient';
export default function MediaNoti({ navigation, route }) {
  const dispatch = useDispatch();
  var { searchUrl, uri, name} = route.params
  const cheerio = require('cheerio');
  const [bigPictureNews, setBigPictureNews] = useState([]);
  const [smallPictureNews, setSmallPictureNews] = useState([]);
  const [ready, setReady] = useState(false);
  async function loadGraphicCards(searchUrl) {
    global.tempArray.splice(0, global.tempArray.length);
    const baseURL = searchUrl.slice(0, searchUrl.lastIndexOf("/"));
    const response = await fetch(searchUrl).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });; // fetch page
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
      global.tempArray.push({ title: title, time: time, imageURL: imageURL, link: link })
    });
    dispatch(setNews_Departments({ data: global.tempArray, identifier: searchUrl }));
  };
  const index = global.news_Departments.findIndex(x => x.identifier == searchUrl);
  if (index == -1) {
    loadGraphicCards(searchUrl);
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      var newbigPicture = [...bigPictureNews];
      var newsmallPicture = [...smallPictureNews];
      var trueNews = global.news_Departments.find(x => x.identifier == searchUrl);
      trueNews.data.forEach((value, index) => {
        Image.getSize(value.imageURL, (imgWidth, imgHeight) => {
          if (imgWidth <= imgHeight) {
            newbigPicture.push(value);
          }
          else {
            newsmallPicture.push(value);
          }
        }, (error) => {
          console.log(error);
        });
      });
      setBigPictureNews(newbigPicture);
      setSmallPictureNews(newsmallPicture);
      setReady(true);
    }, 1000);
    return () => clearTimeout(timer)
  }, [ready]);
  return (
    <ScrollView style={styles.body}>

      {ready ? (<>
      {bigPictureNews.length == 0 ? (<></>) : (        <ScrollView style={styles.mediaNoti_Lastest} horizontal={true} showsHorizontalScrollIndicator={false}>
        {bigPictureNews.map((item, index) => {
          return (
            <TouchableOpacity style={styles.lastestItem} key={item.link + index}
              onPress={() => {
                navigation.navigate('MediaDetail', { link: item.link });
              }}>
              <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                resizeMode='cover'
                source={{ uri: item.imageURL }}
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
                    {item.title}
                  </Text>

                  <Text style={styles.lastestItem_ContentText}>Công ty Jabil Việt Nam tọa lạc tại Khu Công Nghệ Cao (SHTP)...</Text>

                  <View style={styles.row}>
                    <Image style={styles.mediaNotiItem_DepartmentImage}
                      source={{ uri: uri }}>
                    </Image>
                    <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;{name}</Text>
                    <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;{item.time}</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )
        })}
      </ScrollView>)}
      <View style={styles.mediaNoti_All}>
        <Text style={styles.mediaNotiHeader}>Tổng hợp</Text>
        {smallPictureNews.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.mediaNotiItem} key={item.link + index}
              onPress={() => {
                navigation.navigate('MediaDetail', { link: item.link });
              }}>
              <Image style={styles.mediaNotiItem_Image} source={{ uri: item.imageURL }} />

              <View style={styles.mediaNotiItem_Content}>

                <Text style={styles.mediaNotiItem_ContentTitle}>{item.title}</Text>

                <View style={styles.row}>
                  <Image style={styles.mediaNotiItem_DepartmentImage}
                    source={{ uri: uri }}>
                  </Image>
                  <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;{name}</Text>
                  <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;{item.time}</Text>
                </View>

              </View>
            </TouchableOpacity>
          )
        })}
      </View></>) : (<Text>Loading</Text>)}
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
  lastestItem: {
    maxWidth: 220,
    maxHeight: '100%',
    flexDirection: 'column',
    marginRight: 7
  },
  lastestItem_ImageContainer: {
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  lastestItem_linearGradient: {
    borderRadius: 10,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  lastestItem_Content: {
    marginHorizontal: 8,
    marginBottom: 15
  },
  lastestItem_ContentText: {
    color: 'red',
    paddingBottom: 3
  },
  mediaNoti_Lastest: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    flexDirection: 'row',
    height: 300,
  },
  mediaNoti_All: {
    flex: 1,
    marginHorizontal: 20,
  },

  mediaNotiItem: {
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
  mediaNotiItem_DepartmentImage: {
    borderRadius: 100,
    width: 20,
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  mediaNotiItem_ContentDepartment: {
    color: '#FF6E35'
  },
  mediaNotiItem_ContentTime: {
    marginLeft: 5,
    color: 'red'
  },
  mediaNotiItem_Image: {
    width: 110,
    height: 75,
    borderRadius: 4,
    marginRight: 10, //cách hình
  },
  row: {
    flexDirection: 'row'
  }

});
