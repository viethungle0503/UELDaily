import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  SectionList,
} from 'react-native';
import { useState, useRef } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useCallback } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  setScoreBoard,
  setScoreBoardByYear,
  setScoreBoardBySemester
} from '../../redux_toolkit/userSlice';
import styles from './HomeScreenStyles/screen_ScoreBoard_style';
import strings from '../Language';
import { useSelector, useDispatch } from 'react-redux';
import post_data from '../UEL';
import { groupBy } from '../GlobalFunction';

export default function ScoreBoard({ navigation }) {
  const [scoreBoardHolder,setScoreBoardHolder] = useState([]);
  const scoreBoard = useSelector(state => state.user.scoreBoard);
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
  useEffect(() => {
    post_data("scoreboard", currentUser.key).then((response) => {
      var board = groupBy(response, item => item.startYear);
      var size = board.size;
      var sectionArray = []
      board.forEach((value, key, map) => {
        let semester = board.get(key)[0].semester;
        let startYear = board.get(key)[0].startYear;
        let endYear = board.get(key)[0].endYear;
        let title = `Học kỳ ${semester} năm học ${startYear} - ${endYear}`
        sectionArray = [...sectionArray, { title: title, data: value }];
      })
      setScoreBoardHolder(sectionArray);
      dispatch(setScoreBoard(sectionArray));
    })
  }, [])
  function changeView(xyear = 0, xsemester = 0) {
    dispatch(setScoreBoard(scoreBoardHolder));
    // if (xyear != 0) {
    //   dispatch(setScoreBoardByYear(xyear));
    // }
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
  }, [scoreBoard]);
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
          animationType='slide'
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
                    {(credit != 0) ? (`${passedCredit}/${credit}`) : ("Không có dữ liệu")}
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

        </ScrollView>
        {/* Main Content */}
        <SectionList
          sections={scoreBoard}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            function settingModal() {
              const title = (() => (
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeaderText}>{item.courseName}</Text>
                </View>
              ));
              const content = (() => {
                const section = () => {
                  return (
                    <>
                      {
                        (item.attendence != undefined) ? (
                          <View style={styles.modalDetail_RowData}>
                            <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colContent]}>Điểm quá trình</Text>
                            <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPayAmount]}>{item.attendence}</Text>
                          </View>
                        ) : (
                          <></>
                        )
                      }
                      {
                        (item.midterm != undefined) ? (
                          <View style={styles.modalDetail_RowData}>
                            <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colContent]}>Điểm thi giữa học phần</Text>
                            <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPayAmount]}>{item.midterm}</Text>
                          </View>
                        ) : (
                          <></>
                        )
                      }
                      {
                        (item.final != undefined) ? (
                          <View style={styles.modalDetail_RowData}>
                            <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colContent]}>Điểm thi kết thúc học phần</Text>
                            <Text style={[styles.modalDetail_RowDataText, styles.modalDetail_colPayAmount]}>{item.final}</Text>
                          </View>
                        ) : (
                          <></>
                        )
                      }
                    </>
            
                  )
                }
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
                    {section()}
                  </View>
                )
              });
              setModalTitle(title);
              setModalContent(content);
              setOpen(true);
            };
            let overallScore = (item.attendence * item.percentAttendence) + (item.midterm * item.percentMidterm) + (item.final * item.percentFinal)
            return (
              <TouchableOpacity style={styles.listItem}
              onPress={() => settingModal()}>
                <View style={[styles.listItem_Markup, (overallScore >= 5) ? { backgroundColor: '#E3ECFF' } : { backgroundColor: '#FF967C' }]}></View>
                <Text style={styles.listItem_SubjectName}>
                  {item.courseName}
                </Text><View style={styles.listItem_Content}>
                  <Text style={styles.listItem_ContentTitle}>Điểm số:&nbsp;</Text>
                  <Text style={styles.listItem_ContentData}>{overallScore}</Text>
                </View>
                <View style={styles.listItem_Content}>
                  <Text style={styles.listItem_ContentTitle}>Kết quả:&nbsp;</Text>
                  <Text style={styles.listItem_ContentData}>{((overallScore) >= 5) ? "Đạt" : "Chưa đạt"}</Text>
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
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.listSemester}>{title}</Text>
          )}
        />


      </View>
    </TouchableOpacity>


  );
}



