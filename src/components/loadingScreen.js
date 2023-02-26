import {
    View,
    Text,
    ImageBackground,
    SafeAreaView
} from 'react-native';
export default function LoadingScreen() {
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                alignItems: 'center',
                top: '5%'
            }}>
                <Text style={{
                    width: '60%',
                    color: '#252525',
                    fontSize: 17,
                    fontWeight: 'bold',
                }}>
                    Dữ liệu đang được cập nhật, các bạn sinh viên vui lòng chờ trong giây lát !!
                </Text>
            </View>
            <ImageBackground source={require('../assets/loadingprogress.png')}
                resizeMode="contain"
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    bottom:'10%'
                }}
            ></ImageBackground>
            <ImageBackground source={require('../assets/loading.png')}
                resizeMode="contain"
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    bottom:'20%'
                }}
            ></ImageBackground>
        </SafeAreaView>
    )
};