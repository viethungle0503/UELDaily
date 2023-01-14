import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
export default function MediaMain({ navigation }) {
  
  var departments = database_departments.map((item, index) => {
    //let existImage = "asset:/departments/" + item.data.logoUrl;
    //let defaultImage = "asset:/departments/default.png";
    return (
      <TouchableOpacity
        key={index}
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

            <Text style={styles.mediaLastestTime}>9h</Text>
          </View>

          <Text>Danh sách sinh viên được gia hạn đóng học phí</Text>
        </View>
      </TouchableOpacity>
    )
  });
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
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ padding: 20, fontWeight: 'bold', fontSize: 20, color: 'red' }}>
          Sự kiện
        </Text>
        {departments}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  // open item
  effectLeft: {
    position: 'absolute',
    top: 250,
    left: 0,
  },
  effectRightBottom: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  mediaItem: {
    // height: 80,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingRight: 10,
  },
  mediaItem_Image: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: 10,
  },
  mediaItem_Text: {
    flexDirection: 'column',
    borderBottomWidth: 2,
    borderColor: '#F0F0F0',
    justifyContent: 'space-between',
    paddingBottom: 25,
    // paddingHorizontal: 10,
  },
  mediaDepartment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  mediaDepartmentName: {
    width: '80%',
    fontWeight: '600',
    fontSize: 16,
    color: 'red'
  },
});