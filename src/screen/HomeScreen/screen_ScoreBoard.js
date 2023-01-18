import {
  Image,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { useState, useRef } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect,useCallback  } from 'react';
import {useDispatch} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  setScoreBoard,
  setScoreBoardByYear,
  setScoreBoardBySemester
} from '../../redux_toolkit/userSlice';
export default function ScoreBoard({ navigation }) {
  const dispatch = useDispatch();
  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState([
    { label: 'Tất cả', value: '0' },
    { label: 'Năm 1', value: '1' },
    { label: 'Năm 2', value: '2' },
    { label: 'Năm 3', value: '3' },
    { label: 'Năm 4', value: '4' },
  ]);
  const onYearOpen = useCallback(() => {
    setOpenSemester(false);
  }, []);
  const [openSemester, setOpenSemester] = useState(false);
  const [valueSemester, setValueSemester] = useState(null);
  const [itemsSemester, setItemsSemester] = useState([
    { label: 'Tất cả', value: '0' },
    { label: 'Học kỳ 1', value: '1' },
    { label: 'Học kỳ 2', value: '2' },
    { label: 'Học kỳ hè', value: '3' },
  ]);
  const onSemesterOpen = useCallback(() => {
    setOpenYear(false);
  }, []);
  const [year, setYear] = useState(currentUser.data.currentYear)
  const [semester, setSemester] = useState(currentUser.data.currentSemester);
  // Barrier
  const [mediumScore, setMediumScore] = useState(0);
  const [passedCredit, setPassedCredit] = useState(0);
  const [credit, setCredit] = useState(0);
  function changeView(xyear = 0, xsemester = 0) {
    dispatch(setScoreBoard(currentUser.data.scoreboard));
    console.log("done")
    if (xyear != 0) {
      dispatch(setScoreBoardByYear(xyear));
    }
    if (xsemester != 0) {
      dispatch(setScoreBoardBySemester(xsemester));
    }
  };
  var temp1 = 0;
  var temp2 = 0;
  var temp3 = 0;
  useEffect(() => {
    setCredit(temp1);
    setPassedCredit(temp2);
  if(temp1 != 0) {
    setMediumScore((temp3 / temp1).toFixed(2));
  }
  else setMediumScore(0);
    
    temp1 = 0;
    temp2 = 0;
    temp3 = 0;
  },[scoreBoard])
  return (

          <View style={styles.body}>
      {/* Selection */}
      <View style={styles.fixItem}>
        <View style={styles.scoreHeader_Sort}>
        <DropDownPicker
              open={openYear}
              value={valueYear}
              items={itemsYear}
              setOpen={setOpenYear}
              setValue={setValueYear}
              setItems={setItemsYear}
              defaultNull
              labelStyle={styles.btnSort_Text}
              placeholder='Năm học'
              placeholderStyle={styles.btnSort_Text}
              style={styles.btnSort}
              containerStyle={styles.btnSortContainer}
              onChangeValue={(itemValue) => {
                setYear(itemValue);
                changeView(itemValue,semester);
              }}
              dropDownMaxHeight={240}
              dropDownContainerStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
              closeOnBackPressed={true}
              onOpen={onYearOpen}
              ArrowDownIconComponent={() => {
                return (
                  <Image
                    style={styles.examIcon}
                    source={require('../../assets/btnSortIconDown.png')}
                  />
                );
              }}
              ArrowUpIconComponent={() => {
                return (
                  <Image
                    style={styles.examIcon}
                    source={require('../../assets/btnSortIconUp.png')}
                  />
                );
              }}
            />

            <DropDownPicker
              open={openSemester}
              value={valueSemester}
              items={itemsSemester}
              setOpen={setOpenSemester}
              setValue={setValueSemester}
              setItems={setItemsSemester}
              defaultNull
              labelStyle={styles.btnSort_Text}
              placeholder='Học kỳ'
              placeholderStyle={styles.btnSort_Text}
              style={styles.btnSort}
              containerStyle={styles.btnSortContainer}
              onChangeValue={(itemValue) => {
                setSemester(itemValue);
                changeView(year,itemValue);
              }}
              closeOnBackPressed={true}
              onOpen={onSemesterOpen}
              ArrowDownIconComponent={() => {
                return (
                  <Image
                    style={styles.examIcon}
                    source={require('../../assets/btnSortIconDown.png')}
                  />
                );
              }}
              ArrowUpIconComponent={() => {
                return (
                  <Image
                    style={styles.examIcon}
                    source={require('../../assets/btnSortIconUp.png')}
                  />
                );
              }}
            />
        </View>
      </View>
      {/* Selection */}

      {/* Main Content */}
      <TouchableWithoutFeedback onPress={() => {

      if (openSemester) {
        setOpenSemester(false)
      }
      if (openYear) {
        setOpenYear(false);
      }
    }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.dashboard}>
          <Text style={styles.dashboardHeader}>Điểm trung bình toàn khóa</Text>

          <View style={styles.dashboardItemView}>
            {/* Credit */}
            <View
              style={[
                styles.dashboardItem,
                {
                  backgroundColor: '#F7CAB7',
                },
              ]}>
              <Text style={styles.dashboardItem_IndicatorName}>
                Số tín chỉ đã đậu
              </Text>

              <View style={styles.dashboardItem_IndicatorResultView}>
                <Image
                  style={styles.dashboardItem_IndicatorImage}
                  source={require('../../assets/scoreboard_tinchi.png')}
                />
                <Text style={styles.dashboardItem_IndicatorResult}>
                  {passedCredit}/{credit}
                </Text>
              </View>
            </View>
            {/* Credit */}

            {/* Medium Score */}
            <View
              style={[
                styles.dashboardItem,
                {
                  backgroundColor: '#E3ECFF',
                },
              ]}>
              <Text style={styles.dashboardItem_IndicatorName}>
                Điểm trung bình
              </Text>

              <View style={styles.dashboardItem_IndicatorResultView}>
                <Image
                  style={styles.dashboardItem_IndicatorImage}
                  source={require('../../assets/scoreboard_GPA.png')}
                />
                <Text style={styles.dashboardItem_IndicatorResult}>
                  {mediumScore}/10
                </Text>
              </View>
            </View>
            {/* Medium Score */}

            {/* academic capacity */}
            <View
              style={[
                styles.dashboardItem,
                {
                  backgroundColor: '#DEFFD3',
                },
              ]}>
              <Text style={styles.dashboardItem_IndicatorName}>
                Xếp loại học lực
              </Text>

              <View style={styles.dashboardItem_IndicatorResultView}>
                <Image
                  style={styles.dashboardItem_IndicatorImage}
                  source={require('../../assets/scoreboard_tinchi.png')}
                />
                <Text style={styles.dashboardItem_IndicatorResult}>
                  {
                    (mediumScore > 9) ? "Xuất sắc" :
                      (mediumScore > 8) ? "Giỏi" :
                        (mediumScore > 7) ? "Khá" :
                          (mediumScore > 6) ? "Trung bình - Khá" :
                            (mediumScore > 5) ? "Trung bình" : "Nghỉ học đi"
                  }
                </Text>
              </View>
            </View>
            {/* academic capacity */}
          </View>
        </View>
        {
          scoreBoard.map((item,index) => {
            return(
              <View style={styles.list} key={index}>
                          {item.semester.map((subItem, subIndex) => {
              return (
                <View key={subIndex}>
                  <Text style={styles.listSemester}>Học kỳ {subItem.semester_type} {item.name}</Text>
                  {subItem.courses.map((finalItem, finalIndex) => {
                    temp1 += finalItem.credit;
                    if (finalItem.overallScore >= 5) {
                      temp2 += finalItem.credit;
                    }
                    temp3 += (finalItem.overallScore * finalItem.credit)
                    return (
                      <View style={styles.listItem} key={finalIndex}>
                        <View style={[styles.listItem_Markup, (finalItem.overallScore >= 5) ? { backgroundColor: '#E3ECFF' } : { backgroundColor: '#FF967C' }]}></View>
  
                        <Text style={styles.listItem_SubjectName}>
                          {finalItem.courseName}
                        </Text>
  
                        <View style={styles.listItem_Content}>
                          <Text style={styles.listItem_ContentTitle}>Điểm số:&nbsp;</Text>
                          <Text style={styles.listItem_ContentData}>{finalItem.overallScore}</Text>
                        </View>
  
                        <View style={styles.listItem_Content}>
                          <Text style={styles.listItem_ContentTitle}>Kết quả:&nbsp;</Text>
                          <Text style={styles.listItem_ContentData}>{((finalItem.overallScore) >= 5) ? "Đạt" : "Chưa đạt"}</Text>
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
                    )
                  })}
  
                </View>
  
              )
            })}
              </View>
            )
          })
        }
      </ScrollView>
      {/* Main Content */}
      </TouchableWithoutFeedback>
    </View>
    
  );
}

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

  container: {
    flex: 1,
  },

  dashboard: {
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
    color: '#252525',
  },
  dashboardItemView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 18,
    marginRight: 8,
  },
  dashboardItem: {
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
    color: '#252525',
  },
  dashboardItem_IndicatorResultView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardItem_IndicatorImage: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  dashboardItem_IndicatorResult: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#252525',
  },

  // dashboard

  //list
  listSemester: {
    marginHorizontal: 24,
    marginVertical: 20,
    color: '#0065FF',
    fontWeight: 'bold',
    fontSize: 16,
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
  listItem_ViewDetail: {
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
    paddingVertical: 1,
  },
  listItem_ViewDetail_Text: {
    color: '#fff',
    fontSize: 13,
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    marginRight: 50
  },
  btnSortContainer: {
    width: 120,
    height: 30,
    marginRight: 10,
    marginBottom: 10
  },
  btnSort_Text: {
    color: '#0065FF',
    fontSize: 15,
    fontFamily: "Roboto"
  },
  effect: {
    position: 'absolute',
    right: 0,
    top: 0,

    zIndex: 2,
  },
  modalBackground: {
    flex: 1,
    // backgroundColor: 'rbga(0,0,0,0.5)',
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '92%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    elevation: 20,
  },

  modalIconContainer: {
    backgroundColor: '#0065FF',
    borderWidth: 2.5,
    borderColor: '#FFF',
    borderRadius: 50,
    position: 'absolute',
    left: '50%',
    top: -30,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  modalHeaderText: {
    fontSize: 20,
    color: '#252525',
    fontWeight: 'bold'
  },
  modalDetail: {
    borderRadius: 10,
    backgroundColor: '#F7F9FE',
    paddingHorizontal: 15,
    paddingVertical: 20
  },

  modalDetail_Header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingBottom: 5,
    marginBottom: 5,
  },
  modalDetail_RowData: {
    flexDirection: 'row',
    paddingBottom: 5
  },
  modalDetail_RowDataText: {
    color: '#252525'
  },
  modalDetail_HeaderText: {
    fontWeight: 'bold',
    color: '#252525',
  },
  modalDetail_colContent: {
    minWidth: 120,
  },
  modalDetail_colPayAmount: {
    minWidth: 85,
    textAlign: 'right',
  },
  modalDetail_colPaid: {
    minWidth: 85,
    textAlign: 'right',
  },
  modalTotalPay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    paddingTop: 10,
    marginVertical: 5
  },

  modalFooter_ButtonClose: {
    backgroundColor: '#0065FF',

    color: '#0065FF',
    borderRadius: 8,
    width: '100%',
    height: 35,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  modalFooter_ButtonCloseText: {
    color: '#FFF',
  }
});
