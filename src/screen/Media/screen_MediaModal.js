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
import MediaNoti from './screen_MediaNoti';
import MediaContact from './screen_MediaContact'
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
export default function MediaModal({ navigation,route }) {
    var {name,searchUrl, email,phone,website,fanpage,uri} =  route.params;
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
                    component={MediaNoti}
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
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        position: 'relative',
    },
    modalEffect: {
        position: 'absolute',
        top: 30,
        right: 0,
        zIndex: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    modalHeader_btnBackContainer: {
        width: 25,
    },
    modalHeader_btnBack: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    modalHeader_DepartmentName: {
        fontSize: 19,
        fontWeight: '700',
        color: '#252525',
        paddingHorizontal: 10,
    }
})