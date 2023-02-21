import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';


export default function loading({navigation}) {
    <View style={{
        flex: 1,
        alignItems: 'center'
    }}>
        <Text style={{
            width: '60%',
            color: '#252525',
            fontSize: 17,
            fontWeight: 'bold',

        }}>
            Dữ liệu đang được cập nhật, các bạn sinh viên vui lòng chờ trong giây lát !!
        </Text>
       

        <View>
            <Image source={require('../assets/loadingprogress.png')}/>

        </View>
        <View>
            <Image source={require('../assets/loading.png')}/>

        </View>

    </View>
};