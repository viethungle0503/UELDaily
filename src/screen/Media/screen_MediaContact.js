import {
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import styles from './MediaStyles/screen_MediaContact_style';
import strings from '../Language';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function MediaContact({ navigation, route }) {
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  var { email, phone, website, fanpage, uri } = route.params;
  phone = phone.toString();
  phone = phone.replace(',','\n');
  useEffect(() => {
  },[currentLanguage])
  return (
    <View style={styles.body}>
      <View style={styles.mediaContact_ImageContainer}>
        <Image style={styles.mediaContact_Image}
          source={{ uri: uri }}>
        </Image>
      </View>

      <View style={styles.mediaContact_Info}>
        <View style={styles.mediaContact_InfoTitle}>
          <Image
            source={require('../../assets/mediaContact_Email.png')}
            style={styles.mediaContact_InfoTitleIcon}
          />
          <Text style={styles.mediaContact_InfoTitleText}>{strings.email}</Text>
        </View>

        <Text style={styles.mediaContact_InfoData}>{email}</Text>
      </View>

      <View style={styles.mediaContact_Info}>
        <View style={styles.mediaContact_InfoTitle}>
          <Image
            source={require('../../assets/mediaContact_Phone.png')}
            style={styles.mediaContact_InfoTitleIcon}
          />
          <Text style={styles.mediaContact_InfoTitleText}>{strings.phone}</Text>
        </View>

        <Text style={styles.mediaContact_InfoData}>{phone}</Text>
      </View>

      <View style={styles.mediaContact_Info}>
        <View style={styles.mediaContact_InfoTitle}>
          <Image
            source={require('../../assets/mediaContact_Web.png')}
            style={styles.mediaContact_InfoTitleIcon}
          />
          <Text style={styles.mediaContact_InfoTitleText}>{strings.website}</Text>
        </View>

        <Text style={styles.mediaContact_InfoData}>{website}</Text>
      </View>

      <View style={styles.mediaContact_Info}>
        <View style={styles.mediaContact_InfoTitle}>
          <Image
            source={require('../../assets/mediaContact_FB.png')}
            style={styles.mediaContact_InfoTitleIcon}
          />
          <Text style={styles.mediaContact_InfoTitleText}>{strings.fanpage}</Text>
        </View>

        <Text style={styles.mediaContact_InfoData}>{fanpage}</Text>
      </View>

    </View>
  );
}

