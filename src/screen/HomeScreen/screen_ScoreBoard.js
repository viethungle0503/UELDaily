import {
    Image,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
  
  } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function ScoreBoard({navigation}) {
    return(
    <View style={styles.body}>
        <View style={styles.fixItem}>
            <View style={styles.scoreHeader_Sort}>
                
                <TouchableOpacity style={styles.btnSort}>
                    <Text style={styles.btnSort_Text}>Năm học</Text>
                    <Image
                        style={styles.examIcon}
                        source={require('../../assets/btnSortIcon.png')}
                    />
                </TouchableOpacity>
    
                <TouchableOpacity style={styles.btnSort}>
                    <Text style={styles.btnSort_Text}>Học kỳ</Text>
                    <Image
                        style={styles.examIcon}
                        source={require('../../assets/btnSortIcon.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>

        <ScrollView style={styles.container}>
            <View style={styles.dashboard}>
                <Text style={styles.dashboardHeader}>
                    Điểm trung bình toàn khóa
                </Text>

                <View style={styles.dashboardItemView}>
                    <View style={[styles.dashboardItem, 
                        {
                            backgroundColor: '#F7CAB7'
                        }
                    ]}>
                        <Text style={styles.dashboardItem_IndicatorName}>Số tín chỉ đã đậu</Text>
                        
                        <View style={styles.dashboardItem_IndicatorResultView}>
                            <Image
                                style={styles.dashboardItem_IndicatorImage}
                                source={require('../../assets/scoreboard_tinchi.png')}
                            />
                            <Text style={styles.dashboardItem_IndicatorResult}>72/72tc</Text>

                        </View>

                    </View>
                    <View style={[styles.dashboardItem, 
                        {
                            backgroundColor: '#E3ECFF'
                        }
                    ]}>
                        <Text style={styles.dashboardItem_IndicatorName}>Điểm trung bình</Text>
                        
                        <View style={styles.dashboardItem_IndicatorResultView}>
                            <Image
                                style={styles.dashboardItem_IndicatorImage}
                                source={require('../../assets/scoreboard_GPA.png')}
                            />
                            <Text style={styles.dashboardItem_IndicatorResult}>7.99/10</Text>

                        </View>

                    </View>
                    <View style={[styles.dashboardItem, 
                        {
                            backgroundColor: '#DEFFD3'
                        }
                    ]}>
                        <Text style={styles.dashboardItem_IndicatorName}>Xếp loại học lực</Text>
                        
                        <View style={styles.dashboardItem_IndicatorResultView}>
                            <Image
                                style={styles.dashboardItem_IndicatorImage}
                                source={require('../../assets/scoreboard_tinchi.png')}
                            />
                            <Text style={styles.dashboardItem_IndicatorResult}>Khá</Text>
                        </View>
                    </View>
                </View>
            </View>
      
            <View style={styles.list}>
                <Text style={styles.listSemester}>Học kỳ 1/ 2021 - 2022</Text>
                
                <View style={styles.listItem}>
                    <View style={styles.listItem_Markup}></View>
                    
                    <Text style={styles.listItem_SubjectName}>
                    Phân tích thiết kế HTTT quản lý - 221IS4204 (3TC) 
                    </Text>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Điểm số:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>8.0 (A)</Text>
                    </View>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Kết quả:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>Đạt</Text>
                    </View>

                    <TouchableOpacity style={styles.listItem_ViewDetail}>
                        <Text style={styles.listItem_ViewDetail_Text}>Chi tiết</Text>
                        <MaterialCommunityIcons
                            name={'arrow-right-thin'}
                            size={22}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.listItem}>
                    <View style={styles.listItem_Markup}></View>
                    
                    <Text style={styles.listItem_SubjectName}>
                    Phân tích thiết kế HTTT quản lý - 221IS4204 (3TC) 
                    </Text>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Điểm số:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>8.0 (A)</Text>
                    </View>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Kết quả:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>Đạt</Text>
                    </View>

                    <TouchableOpacity style={styles.listItem_ViewDetail}>
                        <Text style={styles.listItem_ViewDetail_Text}>Chi tiết</Text>
                        <MaterialCommunityIcons
                            name={'arrow-right-thin'}
                            size={22}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
            
                <View style={styles.listItem}>
                    <View style={styles.listItem_Markup}></View>
                    
                    <Text style={styles.listItem_SubjectName}>
                    Phân tích thiết kế HTTT quản lý - 221IS4204 (3TC) 
                    </Text>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Điểm số:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>8.0 (A)</Text>
                    </View>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Kết quả:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>Đạt</Text>
                    </View>

                    <TouchableOpacity style={styles.listItem_ViewDetail}>
                        <Text style={styles.listItem_ViewDetail_Text}>Chi tiết</Text>
                        <MaterialCommunityIcons
                            name={'arrow-right-thin'}
                            size={22}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
            
                <View style={styles.listItem}>
                    <View style={styles.listItem_Markup}></View>
                    
                    <Text style={styles.listItem_SubjectName}>
                    Phân tích thiết kế HTTT quản lý - 221IS4204 (3TC) 
                    </Text>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Điểm số:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>8.0 (A)</Text>
                    </View>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Kết quả:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>Đạt</Text>
                    </View>

                    <TouchableOpacity style={styles.listItem_ViewDetail}>
                        <Text style={styles.listItem_ViewDetail_Text}>Chi tiết</Text>
                        <MaterialCommunityIcons
                            name={'arrow-right-thin'}
                            size={22}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
            
                <View style={styles.listItem}>
                    <View style={styles.listItem_Markup}></View>
                    
                    <Text style={styles.listItem_SubjectName}>
                    Phân tích thiết kế HTTT quản lý - 221IS4204 (3TC) 
                    </Text>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Điểm số:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>8.0 (A)</Text>
                    </View>

                    <View style={styles.listItem_Content}>
                        <Text style={styles.listItem_ContentTitle}>Kết quả:&nbsp;</Text>
                        <Text style={styles.listItem_ContentData}>Đạt</Text>
                    </View>

                    <TouchableOpacity style={styles.listItem_ViewDetail}>
                        <Text style={styles.listItem_ViewDetail_Text}>Chi tiết</Text>
                        <MaterialCommunityIcons
                            name={'arrow-right-thin'}
                            size={22}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </View>
    )
};

const styles = StyleSheet.create({
    body: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
    },
    fixItem: {
        paddingTop: 15,
      position: 'relative',
      top: 0,
    },
    examIcon: {
        width: 16,
        height: 16,
    },

    container:{
        flex: 1
    },

    dashboard:{
        flex: 3,
        justifyContent: 'space-evenly',
    },

    list: {
        flex: 6,
    },

    // dashboard
    dashboardHeader: {
        marginVertical: 20, 
        marginHorizontal: 24,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#252525'

    },
    dashboardItemView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginLeft: 18,
        marginRight: 8
    },
    dashboardItem:{
        flex: 1,
        marginRight: 10,

        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'space-evenly',

        shadowColor: 'rgb(0, 101, 255)',
        shadowOffset: {
            width: 0,
            height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    
        elevation: 2,
    },
    dashboardItem_IndicatorName: {
        fontSize: 16,
        color: '#252525'

    },
    dashboardItem_IndicatorResultView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dashboardItem_IndicatorImage: {
      width: 16,
      height: 16,
      marginRight: 6
    },
    dashboardItem_IndicatorResult: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#252525'
    },
    
    // dashboard

    //list
    listSemester:{
        marginHorizontal: 24,
        marginVertical: 20,
        color:'#0065FF',
        fontWeight: 'bold',
        fontSize: 16
    },
    listItem: {
        position: 'relative',
      backgroundColor: '#fff',
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
  
      marginBottom: 10,
      marginHorizontal: 18,
  
      shadowColor: 'rgb(0, 101, 255)',
      shadowOffset: {
        width: 0,
        height: 0.1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 20,
  
      elevation: 2,
    },
    listItem_Markup: {
      // viền màu cam
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundColor: '#E3ECFF',
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
    },
    listItem_SubjectName: {
      fontWeight: 'bold',
      fontSize: 15,
      color: '#080B09',
  
      marginBottom: 5,
    },
    listItem_Content: {
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 15,
    },
    listItem_ContentTitle: {
      color: '#938F8F',
    },
    listItem_ContentData: {
      color: '#000000',
    },
    listItem_ViewDetail:{
        position: 'absolute',
        bottom: 8,
        right: 16,

        backgroundColor: '#0065FF',
        shadowColor: 'rgba(0, 101, 255, 0.25)',
        shadowOffset: {
            width: 0,
            height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    
        elevation: 2,

        borderRadius: 8,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 1


    },
    listItem_ViewDetail_Text:{
        color: '#fff',
        fontSize: 13
    },
  
    col: {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'flex-start',
      justifyContent: 'space-around',
    },
    row: {
      display: 'flex',
      // flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'flex-start',
      marginTop: 12,
      marginRight: 10,
      // overflow: 'hidden'
    },
    // lichthiHeader: {
    //   display: 'flex',
    //   flexDirection: 'row',
    //   alignItems: 'center',
    // },
    // lichthiHeader_Text: {
    //   fontSize: 20,
    //   fontWeight: 'bold',
    //   color: '#252525',
    //   paddingVertical: 5,
    // },
    scoreHeader_Sort: {
      display: 'flex',
      flexDirection: 'row',
  
      justifyContent: 'flex-end',
    },
    btnSort: {
      borderColor: '#0065FF',
      borderRadius: 8,
  
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginLeft: 10,
  
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    btnSort_Text: {
      color: '#0065FF',
      paddingRight: 7,
    },
  
    effect: {
      position: 'absolute',
      right: 0,
      top: 0,
  
      zIndex: 2,
    },
  });
  