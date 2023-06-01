import { StyleSheet } from "react-native";
export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        position: 'relative',
    },
    modalEffect: {
        position: 'absolute',
        top: 30,
        right: 0,
        zIndex: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    modalHeader_btnBackContainer: {
        width: 25,
    },
    modalHeader_btnBack: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    modalHeader_DepartmentName: {
        fontSize: 19,
        fontWeight: '700',
        color: '#252525',
        paddingHorizontal: 10,
    }
});