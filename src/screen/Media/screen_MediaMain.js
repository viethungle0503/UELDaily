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
        <Text style={{ padding: 20, fontWeight: 'bold', fontSize: 20, color: "#252525"}}>
          {strings.news}
        </Text>
        <FlatList
          initialNumToRender={15}
          showsVerticalScrollIndicator={false}
          data={db_departments}
          renderItem={({ item, index }) => {
            //let existImage = "asset:/departments/" + item.data.logoUrl;
            //let defaultImage = "asset:/departments/default.png";
            let postDay = new Date();
            if (news_Departments.length != 0) {
              var element = news_Departments.find(x => x.identifier == item.data.newsLink)
              let postTime = element.data[0].time;
              postTime = postTime.substr(1, 10).replaceAll('/', '-');
              postTime = `${postTime.substr(3, 2)}-${postTime.substr(0, 2)}-${postTime.substr(6, 4)}`;
              if (postTime != "--") {
                postDay = new Date(postTime)
              }
            }

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
                    <Text style={styles.mediaLastestTime}>{dateDiffInDays(new Date(), postDay)}</Text>
                  </View>
                  <Text style={styles.mediaLastestNews}>{`${element.data[0].title.substr(0, 40)}...`}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => (item + index).toString()} />
      </SafeAreaView>
    </View>
  )
}
