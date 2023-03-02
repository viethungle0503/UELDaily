import { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setSingleNews_Departments, setNews_Departments } from '../../redux_toolkit/newsSlice';
import LinearGradient from 'react-native-linear-gradient';
import styles from './MediaStyles/screen_MediaNoti_style';
import strings from '../Language';
import { useSelector } from 'react-redux';
import { loadGraphicCards } from '../GlobalFunction';
import LoadingScreen from '../../components/loadingScreen';
export default function MediaNoti({ navigation, route }) {
  const news_Departments = useSelector(state => state.news.news_Departments);
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const dispatch = useDispatch();
  var { searchUrl, uri, name } = route.params;
  const [bigPictureNews, setBigPictureNews] = useState([]);
  const [smallPictureNews, setSmallPictureNews] = useState([]);
  const [ready, setReady] = useState(false);
  const renderHeader = () => {
    return (
      <>
        {bigPictureNews?.length == 0 ? (<></>) : (
          <FlatList
            style={[styles.mediaNoti_Lastest]}
            ListEmptyComponent={() => {
              return (
                <View style={styles.empty}>
                  <Text style={styles.emptyText}>
                    Hello
                  </Text>
                </View>
              )
            }}
            horizontal={true}
            keyExtractor={(item, index) => (item + index).toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={bigPictureNews}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.lastestItem}
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

                      {/* <Text style={styles.lastestItem_ContentText}>Công ty Jabil Việt Nam tọa lạc tại Khu Công Nghệ Cao (SHTP)...</Text> */}

                      <View style={styles.row}>
                        <Image style={styles.mediaNotiItem_DepartmentImage}
                          source={{ uri: uri }}>
                        </Image>

                        <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;
                          {name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '').toUpperCase()}
                        </Text>
                        <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;{item.time.substr(1,10)}</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )
            }}
          />
        )}
        <View style={styles.mediaNoti_All}>
          <Text style={styles.mediaNotiHeader}>{strings.general}</Text>
        </View>

      </>
    )
  }
  useEffect(() => {
    const index = news_Departments.findIndex(x => x.identifier == searchUrl);
    if (index == -1) {
      loadGraphicCards(searchUrl).then((response) => {
        dispatch(setSingleNews_Departments({ data: response, identifier: searchUrl }));
        const newsAsync = async () => {
          var a = await response.forEach(async (value, index) => {
            await Image.getSize(value.imageURL, (imgWidth, imgHeight) => {
              if (imgWidth <= imgHeight) {
                setBigPictureNews(prev => [...prev,value]);
              }
              else {
                setSmallPictureNews(prev => [...prev,value]);
              };
            });
            
          });
        };
        newsAsync().then(() => {
          setTimeout(() => {
            setReady(true)
          },500)
        });
      })
    }
    else {
      var trueNews = news_Departments[index];
      const bigNewsAsync = async () => {
        var a = await trueNews.data.forEach(async (value, index) => {
          await Image.getSize(value.imageURL, (imgWidth, imgHeight) => {
            if (imgWidth <= imgHeight) {
              // newbigPicture.push(value);
              setBigPictureNews(prev => [...prev,value]);
            }
            else {
              // newsmallPicture.push(value);
              setSmallPictureNews(prev => [...prev,value]);
            }
          }, (error) => {
            console.log(error);
          });
        });
      }
      bigNewsAsync().then(() => {
        setTimeout(() => {
          setReady(true)
        },500)
        
      });
    }
  }, []);
  useEffect(() => {
  }, [currentLanguage, ready])
  return (
    <SafeAreaView style={styles.body}>
      {(ready == true) ? (
        <FlatList
          ListHeaderComponent={renderHeader}
          keyExtractor={(item, index) => (item + index).toString()}
          showsVerticalScrollIndicator={false}
          data={smallPictureNews}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.mediaNotiItem}
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
                    <Text style={styles.mediaNotiItem_ContentDepartment}>&nbsp;{name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '').toUpperCase()}</Text>
                    <Text style={styles.mediaNotiItem_ContentTime}>&nbsp;{item.time.substr(1,10)}</Text>
                  </View>

                </View>
              </TouchableOpacity>
            )
          }}
        />
      ) : (<LoadingScreen />)}
    </SafeAreaView>
  );
}


