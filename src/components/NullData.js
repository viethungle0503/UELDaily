import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Modal
} from 'react-native';
import screen_ProfileDisplay_style from '../screen/Profile/ProfileStyles/screen_ProfileDisplay_style';
export default function NullData({ navigation }) {
    const [datanull, showDataNull] = useState(false);

    return(
    

    <Modal
        visible={datanull} 
        transparent={true} 
        onRequestClose={() => showDataNull(false)}
        
        style={{
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: '#FFF'
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

        <View style={{
            width: '100%'
        }}>
            <Image source={require('../assets/null.png')} 
                style={{
                    width: '100%'
                }}
            />

        </View>

    </Modal>
    )
};