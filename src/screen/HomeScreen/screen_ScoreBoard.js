import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Touchable,
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
import styles from './HomeScreenStyles/screen_ScoreBoard_style';
import strings from '../Language';
import { useSelector } from 'react-redux';

export default function ScoreBoard({ navigation }) {
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const dispatch = useDispatch();
  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState([
    { label: 'Tất cả', value: '0' },
    { label: strings.first_year, value: '1' },
    { label: strings.second_year, value: '2' },
    { label: strings.third_year, value: '3' },
    { label: strings.fourth_year, value: '4' },
  ]);
  const onYearOpen = useCallback(() => {
    setOpenSemester(false);
  }, []);
  const [openSemester, setOpenSemester] = useState(false);
  const [valueSemester, setValueSemester] = useState(null);
  const [itemsSemester, setItemsSemester] = useState([
    { label: 'Tất cả', value: '0' },
    { label: strings.first_semester, value: '1' },
    { label: strings.second_semester, value: '2' },
    { label: strings.summer_semester, value: '3' },
  ]);
  const onSemesterOpen = useCallback(() => {
    setOpenYear(false);
  }, []);
  const [year, setYear] = useState(currentUser.data.currentYear)
  const [semester, setSemester] = useState(currentUser.data.currentSemester);
  // Score & Credits
  const [mediumScore, setMediumScore] = useState(0);
  const [passedCredit, setPassedCredit] = useState(0);
  const [credit, setCredit] = useState(0);
  // Modal
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalContent, setModalContent] = useState();
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
  useEffect(() => {
  },[currentLanguage])
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

        <Modal
          visible={open}
          transparent={true}
          animationType= 'slide'
          >
          <View style={styles.modalBackground} >
            <View style={styles.modalContainer}>
              <View style={styles.modalIconContainer}>
                <MaterialCommunityIcons
                  style={styles.modalIcon}
                  name={'clipboard-text-outline'}
                  size={35}
                  color={'#FFF'}
                />
              </View>
              {modalTitle}
              {modalContent}
              <TouchableOpacity
                style={styles.modalFooter_ButtonClose}
                onPress={() => setOpen(false)}>
                <Text style={styles.modalFooter_ButtonCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
         
          <View style={{ alignItems: 'center' }}>
          </View>

        </Modal>

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
              placeholder={strings.year}
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
              placeholder={strings.semester}
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
            <Text style={styles.dashboardHeader}>{strings.Overall_GPA}</Text>

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
                {strings.passed_credits}
                </Text>

                <View style={styles.dashboardItem_IndicatorResultView}>
                  <Image
                    style={styles.dashboardItem_IndicatorImage}
                    source={require('../../assets/scoreboard_tinchi.png')}
                  />
                  <Text style={styles.dashboardItem_IndicatorResult}>
                    {(credit != 0) ? (`${passedCredit}/${credit}`) :("Không có dữ liệu")}
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
                {strings.GPA}
                </Text>

                <View style={styles.dashboardItem_IndicatorResultView}>
                  <Image
                    style={styles.dashboardItem_IndicatorImage}
                    source={require('../../assets/scoreboard_GPA.png')}
                  />
                  <Text style={styles.dashboardItem_IndicatorResult}>
                    {(passedCredit != 0) ? (
                      `${mediumScore}/10`
                    ) : ("Không có dữ liệu")}
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
                {strings.classification}
                </Text>

                <View style={styles.dashboardItem_IndicatorResultView}>
                  <Image
                    style={styles.dashboardItem_IndicatorImage}
                    source={require('../../assets/scoreboard_tinchi.png')}
                  />
                  <Text style={styles.dashboardItem_IndicatorResult}>
                    {
                      (credit != 0) ? (
                        (mediumScore > 9) ? "Xuất sắc" :
                        (mediumScore > 8) ? "Giỏi" :
                          (mediumScore > 7) ? "Khá" :
                            (mediumScore > 6) ? "Trung bình - Khá" :
                              (mediumScore > 5) ? "Trung bình" : "Yếu"
                      ) : "Không có dữ liệu"
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
                          };
                          temp3 += (finalItem.overallScore * finalItem.credit);
                          function settingModal() {
                            const title = (() => (
                              <View style={styles.modalHeader}>
                                <Text style={styles.modalHeaderText}>{finalItem.courseName}</Text>
                              </View>
                            ));
                            const content = (() => {
                              const section = Object.keys(finalItem.courseScore).map((lastItem, lastIndex) => {
                                return(
                                <View style={styles.modalDetail_RowData} key={lastIndex}>
                                  <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colContent]}>{lastItem}</Text>
                                  <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPayAmount]}>{finalItem.courseScore[lastItem]}</Text>
                                </View>
                              )})
                              return (
                                <View style={styles.modalDetail}>
                                  <View style={styles.modalDetail_Header}>
                                    <Text style={[styles.modalDetail_HeaderText, styles.modalDetail_colContent]}>
                                      Điểm thành phần
                                    </Text>
                                    <Text style={[styles.modalDetail_HeaderText, styles.modalDetail_colPayAmount]}>
                                      Thang 10
                                    </Text>
                                  </View>
                                  {section}
                                </View>
                              )
                            });
                            setModalTitle(title);
                            setModalContent(content);
                            setOpen(true);
                          }
                          return (
                            <TouchableOpacity style={styles.listItem} key={finalIndex} 
                              onPress={() => settingModal()}>
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

                              {/* <TouchableOpacity style={styles.listItem_ViewDetail}
                                onPress={() => settingModal()}>
                                <Text style={styles.listItem_ViewDetail_Text}>Chi tiết</Text>
                                <MaterialCommunityIcons
                                  name={'arrow-right-thin'}
                                  size={22}
                                  color={'#fff'}
                                />
                              </TouchableOpacity> */}
                            </TouchableOpacity>
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
