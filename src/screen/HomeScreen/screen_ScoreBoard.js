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
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  setScoreBoard,
  setScoreBoardByYear,
  setScoreBoardBySemester
} from '../../redux_toolkit/userSlice';
import styles from './HomeScreenStyles/screen_ScoreBoard_style'
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
    if (temp1 != 0) {
      setMediumScore((temp3 / temp1).toFixed(2));
    }
    else setMediumScore(0);

    temp1 = 0;
    temp2 = 0;
    temp3 = 0;
  }, [scoreBoard])
  return (
    <TouchableOpacity activeOpacity={1} style={styles.body} onPress={() => {
    if (openSemester) {
      setOpenSemester(false)
    }
    if (openYear) {
      setOpenYear(false);
    }
  }}>
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
              changeView(itemValue, semester);
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
              changeView(year, itemValue);
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
          scoreBoard.map((item, index) => {
            return (
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



    </View>
  </TouchableOpacity>



  );
}
