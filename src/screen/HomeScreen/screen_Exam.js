import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { useCallback, useEffect, useState } from 'react';
import styles from './HomeScreenStyles/screen_Exam_style';
import strings from '../Language';
import { useSelector } from 'react-redux';


export default function Exam({ navigation }) {
  const currentLanguage = useSelector(state => state.user.currentLanguage);
  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState([
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
    { label: strings.first_semester, value: '1' },
    { label: strings.second_semester, value: '2' },
    { label: strings.summer_semester, value: '5' },
  ]);
  const onSemesterOpen = useCallback(() => {
    setOpenYear(false);
  }, []);
  const [year, setYear] = useState(currentUser.data.currentYear)
  const [semester, setSemester] = useState(currentUser.data.currentSemester);
  function changeView(year, semester) {
    let examScheduleHolder = currentUser.data.test_schedules.filter(x => x.year_type == year && x.semester_type == semester);
    setExamSchedule(examScheduleHolder);
  }
  const [ready, setReady] = useState(null)
  const [examSchedule, setExamSchedule] = useState([]);
  useEffect(() => {
    if (examSchedule.length == 0) {
      setValueYear(currentUser.data.currentYear);
      setValueSemester(currentUser.data.currentSemester);
      let testSchedules = currentUser.data.test_schedules.filter(x => x.year_type == year && x.semester_type == semester);
      var examScheduleHolder = [...examSchedule];
      for (key in testSchedules) {
        examScheduleHolder.push(testSchedules[key]);
      }
      setExamSchedule(examScheduleHolder);
    }
  }, []);
  useEffect(() => {
  },[currentLanguage])
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
          showsVerticalScrollIndicator={false}
          style={styles.monthi}
          data={examSchedule}
          renderItem={({ item }) => {
            return (
              <View style={styles.monthi_Item}>
                <View style={styles.monthi_Item_Markup}></View>
                <Text style={styles.monthi_Item__SubjectName}>
                  {item.course_name}
                </Text>

                <View style={styles.monthi_Item__Detail}>
                  <Image
                    style={styles.examIcon}
                    source={require('../../assets/ngaythi.png')}></Image>
                  <Text style={styles.monthi_Item__DetailTitle}>{`${strings.exam_date}: `}</Text>
                  <Text style={styles.monthi_Item__DetailData}>{item.date}</Text>
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
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}


