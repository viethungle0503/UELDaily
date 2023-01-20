import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import {MediaNoti, MediaNoti1} from './screen_MediaNoti';
import styles from './MediaStyles/screen_MediaModal_style';
import MediaContact from './screen_MediaContact'
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
export default function MediaModal({ navigation,route }) {
    var {name,searchUrl, email,phone,website,fanpage,uri} =  route.params;
    var ready = false;
    if(global.news_Departments.findIndex(x => x.identifier == searchUrl) != -1) {
        ready = true;
    };
    return (
        <View style={styles.modalContainer}>
            <Image
                style={styles.modalEffect}
                source={require('../../assets/mediaEffect.png')}
            />
            <View style={styles.modalHeader}>
                <TouchableOpacity
                    style={styles.modalHeader_btnBackContainer}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../assets/btnBack.png')}
                        style={styles.modalHeader_btnBack}
                    />
                </TouchableOpacity>

                <Text style={styles.modalHeader_DepartmentName}>
                    {name}
                </Text>
            </View>

            <Tab.Navigator
                initialRouteName="MediaNoti"
                screenOptions={{
                    tabBarActiveTintColor: '#0065FF',
                    tabBarInactiveTintColor: 'black',
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        // backgroundColor: {Focused ? backgroundColor :"white" : backgroundColor: '#F7F9FE'},
                    },
                    tabBarStyle: {
                        // backgroundColor: '#F7F9FE',
                        paddingVertical: 0,
                        // paddingHorizontal: 10,
                        textTransform: 'capitalize',
                    },
                    tabBarPressColor: '#0065FF',
                }}>
                <Tab.Screen
                    style={styles.notiHeader_Sort_btnActive}
                    name="MediaNoti"
                    component={ready ? MediaNoti1 : MediaNoti}
                    initialParams={{searchUrl:searchUrl,uri:uri,name:name}}
                    options={{
                        tabBarLabel: 'Thông báo',
                        upperCaseLabel: false,
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="MediaContact"
                    component={MediaContact}
                    initialParams={{email:email,phone:phone,website:website,fanpage:fanpage,uri:uri}}
                    options={{ tabBarLabel: 'Liên hệ', headerShown: false }}
                />
            </Tab.Navigator>
        </View>
    )
}
