import {
    Text,
    TouchableOpacity
} from 'react-native'


export default function PersonalCard ( {navigation}) {
    return (
        <>
        <TouchableOpacity
                    style={styles.modalHeader_btnBackContainer}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../assets/btnBack.png')}
                        style={styles.modalHeader_btnBack}
                    />
                </TouchableOpacity>


        <Text>Thẻ sinh viên</Text>

        </>


    )
};