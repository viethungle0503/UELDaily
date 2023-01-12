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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default function MediaContact({ navigation, route }) {
  var { email, phone, website, fanpage, uri } = route.params;
  phone = phone.toString();
  phone = phone.replace(',','\n');
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
          <Text style={styles.mediaContact_InfoTitleText}>Email:</Text>
        </View>

        <Text style={styles.mediaContact_InfoData}>{email}</Text>
      </View>

      <View style={styles.mediaContact_Info}>
        <View style={styles.mediaContact_InfoTitle}>
          <Image
            source={require('../../assets/mediaContact_Phone.png')}
            style={styles.mediaContact_InfoTitleIcon}
          />
          <Text style={styles.mediaContact_InfoTitleText}>Số điện thoại:</Text>
        </View>

        <Text style={styles.mediaContact_InfoData}>{phone}</Text>
      </View>

      <View style={styles.mediaContact_Info}>
        <View style={styles.mediaContact_InfoTitle}>
          <Image
            source={require('../../assets/mediaContact_Web.png')}
            style={styles.mediaContact_InfoTitleIcon}
          />
          <Text style={styles.mediaContact_InfoTitleText}>Website:</Text>
        </View>

        <Text style={styles.mediaContact_InfoData}>{website}</Text>
      </View>

      <View style={styles.mediaContact_Info}>
        <View style={styles.mediaContact_InfoTitle}>
          <Image
            source={require('../../assets/mediaContact_FB.png')}
            style={styles.mediaContact_InfoTitleIcon}
          />
          <Text style={styles.mediaContact_InfoTitleText}>Fanpage:</Text>
        </View>

        <Text style={styles.mediaContact_InfoData}>{fanpage}</Text>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    color: '#252525',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 40
  },
  mediaContact_ImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 30
  },
  mediaContact_Image: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 100,
  },

  mediaContact_Info: {
    paddingVertical: 10,
  },
  mediaContact_InfoTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mediaContact_InfoTitleIcon: {
    width: 25,
    aspectRatio: 1,
    marginRight: 5
  },
  mediaContact_InfoTitleText: {
    color: '#625F5F',
    fontSize: 16,
  },
  mediaContact_InfoData: {
    color: '#252525',
    fontSize: 17,
    fontWeight: '500'
  },


});
