import {
    View,
    Text,
    Image,
    ImageBackground
} from 'react-native';
import screen_ProfileDisplay_style from '../screen/Profile/ProfileStyles/screen_ProfileDisplay_style';
import { SafeAreaView } from 'react-native';
export default function NullDataScreen() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            <View style={{
                alignItems: 'center',
                marginHorizontal: 20,
                top:'30%'
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
                <Text style={{
                    color: '#625F5F',
                    paddingBottom: 5
                }}>
                    Vui lòng chọn lại mốc thời gian khác.
                </Text>
            </View>
            <ImageBackground source={require('../assets/null.png')}
                resizeMode="contain"
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}
            >
            </ImageBackground>
        </SafeAreaView>
    )
};