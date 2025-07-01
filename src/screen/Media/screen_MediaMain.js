import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles from './MediaStyles/screen_MediaMain_style';
import strings from '../Language';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { dateDiffInDays } from '../GlobalFunction';
export default function MediaMain({ navigation }) {
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const db_departments = useSelector(state => state.database.db_departments);
  const news_Departments = useSelector(state => state.news.news_Departments);
  const time = (item) => {
    let postDay = new Date();
    let today = new Date();
    var element = news_Departments?.find(x => x.identifier == item.data.newsLink)
    let postTime = element?.data[0].time;
    if (postTime.length > 0) {
      postDay = new Date(postTime)
      return <Text style={styles.mediaLastestTime}>{dateDiffInDays(today, postDay)}</Text>
    }
    return <Text style={styles.mediaLastestTime}>{strings.unknown}</Text>
    
  };
  const highlight = (item) => {
    var element = news_Departments?.find(x => x.identifier == item.data.newsLink)
    return <Text
      numberOfLines={1}
      ellipsizeMode="tail" style={styles.mediaLastestNews}>
      {`${element?.data[0]?.title.substr(0, 40)}...`}
    </Text>;
  };
  useEffect(() => {
  }, [currentLanguage])
  return (
    <View style={styles.body}>
      <Image
        style={styles.effectLeft}
        source={require('../../assets/preLoginEffectLeft.png')}
      />
      <Image
        style={styles.effectRightBottom}
        source={require('../../assets/preLoginEffectRightBottom.png')}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ padding: 20, fontWeight: 'bold', fontSize: 20, color: "#252525" }}>
          {strings.news}
        </Text>
        <FlatList
          initialNumToRender={8}
          showsVerticalScrollIndicator={false}
          data={db_departments}
          renderItem={({ item, index }) => {
            //let existImage = "asset:/departments/" + item.data.logoUrl;
            //let defaultImage = "asset:/departments/default.png";
            return (
              <TouchableOpacity
                style={styles.mediaItem}
                onPress={() => navigation.navigate('MediaModal',
                  {
                    name: item.data.name, searchUrl: item.data.newsLink,
                    email: item.data.email, phone: item.data.phone,
                    website: item.data.website, fanpage: item.data.page,
                    uri: "asset:/" + item.logoLocation
                  })}>
                <Image
                  style={styles.mediaItem_Image}
                  source={{ uri: "asset:/" + item.logoLocation }} />
                <View style={styles.mediaItem_Text}>
                  <View style={styles.mediaDepartment}>
                    <Text style={styles.mediaDepartmentName}>
                      {item.data.name}
                    </Text>
                    {time(item)}
                  </View>
                  {highlight(item)}
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => (item + index).toString()} />
      </SafeAreaView>
    </View>
  )
}
