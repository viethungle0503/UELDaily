import { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setNews_Departments } from '../../redux_toolkit/newsSlice';
import LinearGradient from 'react-native-linear-gradient';
import styles from './MediaStyles/screen_MediaNoti_style';
import strings from '../Language';
import { useSelector } from 'react-redux';
import { loadGraphicCards } from '../GlobalFunction';
export default function MediaNoti({ navigation, route }) {
  const news_Departments = useSelector(state => state.news.news_Departments);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const dispatch = useDispatch();
  var { searchUrl, uri, name } = route.params;
  const [bigPictureNews, setBigPictureNews] = useState([]);
  const [smallPictureNews, setSmallPictureNews] = useState([]);
  const [ready, setReady] = useState(false);
  const index = news_Departments.findIndex(x => x.identifier == searchUrl);
  if (index == -1) {
    var detailNews = loadGraphicCards(searchUrl);
  }
  useEffect(() => {
    if (index == -1) {
      detailNews.then((response) => {
        dispatch(setNews_Departments({ data: response, identifier: searchUrl }));
        var newbigPicture = [...bigPictureNews];
        var newsmallPicture = [...smallPictureNews];
        response.forEach((value, index) => {
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
      })
    }
    else {
      var trueNews = news_Departments.find(x => x.identifier == searchUrl);
      var newbigPicture = [...bigPictureNews];
        var newsmallPicture = [...smallPictureNews];
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
    }
  }, []);
  useEffect(() => {
    console.log("changed");
  }, [currentLanguage, ready])
  return (
    <ScrollView style={styles.body}>
      {ready ? (<>
        {bigPictureNews.length == 0 ? (<></>) : (<ScrollView style={styles.mediaNoti_Lastest} horizontal={true} showsHorizontalScrollIndicator={false}>
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
          <Text style={styles.mediaNotiHeader}>{strings.general}</Text>
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


