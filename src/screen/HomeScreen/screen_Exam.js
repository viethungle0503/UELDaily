import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  SafeAreaView
} from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { useCallback, useEffect, useState } from 'react';
import styles from './HomeScreenStyles/screen_Exam_style';
import strings from '../Language';
import { useSelector, useDispatch } from 'react-redux';
import post_data from '../UEL';
import { setTestSchedule } from '../../redux_toolkit/userSlice';


export default function Exam({ navigation }) {
  const dispatch = useDispatch();
  const testSchedule = useSelector(state => state.user.testSchedule);
  const currentUser = useSelector(state => state.user.currentUser);
  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState([
    { label: strings.first_year, value: '1' },
    { label: strings.second_year, value: '2' },
    { label: strings.third_year, value: '3'},
    { label: strings.fourth_year, value: '4' },
  ]);
  const onYearOpen = useCallback(() => {
    setOpenSemester(false);
  }, []);
  const [openSemester, setOpenSemester] = useState(false);
  const [valueSemester, setValueSemester] = useState(null);
  const [itemsSemester, setItemsSemester] = useState([
    { label: strings.first_semester, value: '1' },
    { label: strings.second_semester, value: '2' },
    { label: strings.summer_semester, value: '5' },
  ]);
  const onSemesterOpen = useCallback(() => {
    setOpenYear(false);
  }, []);
  const [year, setYear] = useState(0)
  const [semester, setSemester] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  function changeView(xyear, xsemester) {
    setExamSchedule(testSchedule);
    xyear = parseFloat(xyear) + parseFloat(currentUser.yearAdmission);
    setExamSchedule(item => item.filter(x => x.semester == xsemester && x.endYear == xyear));
  }
  const [examSchedule, setExamSchedule] = useState([]);
  useEffect(() => {
    setValueYear((new Date().getFullYear() - currentUser.yearAdmission).toString());
    setValueSemester("2");
    if(testSchedule.length == 0) {
      post_data("testschedule", currentUser.id).then((response) => {
        dispatch(setTestSchedule(response));
        setExamSchedule(response);
      });
    }
    else {
      setExamSchedule(testSchedule);
    }
    
    setIsLoading(false);
  }, []);
  useEffect(() => {
    changeView((new Date().getFullYear() - currentUser.yearAdmission),2);
  },[isLoading])
  return (
    <TouchableWithoutFeedback onPress={() => {
      if (openSemester) {
        setOpenSemester(false)
      }
      if (openYear) {
        setOpenYear(false);
      }
    }}>
      <View style={styles.body}>
        <View style={styles.fixItem}>
          <View style={styles.examScheduleHeader_Sort}>
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
              onChangeValue={(item) => {
                setYear(item);
                changeView(item, semester)
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
              onChangeValue={(item) => {
                setSemester(item);
                changeView(year, item)
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

        <FlatList
        ListEmptyComponent={() => {
          return(
            <SafeAreaView style={{
              minHeight: 500,
            }}>
              <View style={{
                alignItems: 'center',
              }}>
                <Text style={{
                  width: '60%',
                  color: '#252525',
                  fontSize: 17,
                  fontWeight: 'bold',
                  paddingBottom: 10
                }}>
                  Không có dữ liệu ở thời điểm này !!!
                </Text>
              </View>
              <ImageBackground source={require('../../assets/null.png')}
                resizeMode="contain"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
              </ImageBackground>
            </SafeAreaView>
          )
        }}
          showsVerticalScrollIndicator={false}
          style={styles.monthi}
          data={examSchedule}
          renderItem={({ item }) => {
            return (
              <View style={styles.monthi_Item}>
                <View style={styles.monthi_Item_Markup}></View>
                <Text style={styles.monthi_Item__SubjectName}>
                  {item.courseName}
                  {/* lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem */}
                </Text>

                <View style={styles.monthi_Item__Detail}>
                  <Image
                    style={styles.examIcon}
                    source={require('../../assets/ngaythi.png')}></Image>
                  <Text style={styles.monthi_Item__DetailTitle}>{`${strings.exam_date}: `}</Text>
                  <Text style={styles.monthi_Item__DetailData}>{changeDateFormat(item.date)}</Text>
                </View>

                <View style={styles.monthi_Item__Detail}>
                  <Image
                    style={styles.examIcon}
                    source={require('../../assets/thoigianthi.png')}></Image>
                  <Text style={styles.monthi_Item__DetailTitle}>{`${strings.time}: `}</Text>
                  <Text style={styles.monthi_Item__DetailData}>{item.time}</Text>
                </View>

                <View style={styles.monthi_Item__Detail}>
                  <Image
                    style={styles.examIcon}
                    source={require('../../assets/phongthi.png')}></Image>
                  <Text style={styles.monthi_Item__DetailTitle}>{`${strings.examination_room}: `}</Text>
                  <Text style={styles.monthi_Item__DetailData}>{item.room}</Text>
                </View>
              </View>
            )
          }}
          keyExtractor={(item, index) => (item+index).toString()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

function changeDateFormat(value) {
  let date = new Date(value);
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
}


