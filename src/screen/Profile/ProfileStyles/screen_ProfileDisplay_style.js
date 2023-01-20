import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 50,
    },
    /* chia layout */
    accountHeader: {
        width: '100%',
        height: 300,
        // height: '100%',
        backgroundColor: '#FFF',

        flexDirection: 'column',
        justifyContent: 'center',

        alignItems: 'center',
        zIndex: 2,
    },
    accountInfoContainer: {
        // flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',

        zIndex: 1,
    },
    accountSettingContainer: {
        // flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        marginVertical: 6,
    },
    accountPolicyContainer: {
        // flex: 4,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
    },

    /* phần đầu: illustration và hình tên user */

    accountHeader_Content: {
        alignItems: 'center',
        zIndex: 3,
    },
    studentAvatarContainer: {
        borderColor: 'rgba(255, 110, 53, 1)',
        padding: 5,
        borderWidth: 1,
        borderRadius: 100,
    },
    studentAvatar: {
        width: 100,
        aspectRatio: 1,
        borderRadius: 100,
    },
    studentName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#252525',
        marginTop: 15,
    },
    /* illustration and user info end*/

    /*change language popup  */
    langBackground: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    langContainer: {
        width: '75%',
        backgroundColor: '#FFF',
        paddingHorizontal: 25,
        paddingVertical: 20,

        borderRadius: 20,
        elevation: 20,
    },
    langNation_Vie: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    langNation_Eng: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    langNationIcon: {
        height: 25,
        aspectRatio: 0.9,
        marginRight: 10,
    },
    langSelectNationIcon: {
        width: 30,
        aspectRatio: 1,
        opacity: 0,
    },
    langFooter_ButtonClose: {
        backgroundColor: '#0065FF',

        color: '#0065FF',
        borderRadius: 8,
        width: '100%',
        height: 35,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    /*change language popup  */

    /* font  */
    accountHeading: {
        color: '#080B09',
        fontWeight: '600',
        paddingBottom: 5,
        paddingTop: 10,
        fontSize: 18,
    },
    accountText: {
        color: '#252525',
        fontWeight: '500',
        fontSize: 16,
    },
    accountDataText: {
        color: '#938F8F',
        fontSize: 16,
    },

    /* section cài đặt ngôn ngữ  */
    accountListItem: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    accountListItem_IconTitle: {
        width: 30,
        aspectRatio: 1,
        marginRight: 8,
    },
    accountListItem_IconOpen: {
        width: 11,
        aspectRatio: 0.6,
        marginLeft: 10,
    },

    /* section cài đặt ngôn ngữ  */

    /* section điều khoản sử dụng */
    policy_accountText: {
        color: '#252525',
        fontWeight: '500',
        fontSize: 16,
        width: '90%',
    },
    btnLogoutContainer: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        alignContent: 'stretch',
    },
    btnLogout: {
        marginTop: 20,
        backgroundColor: 'rgba(255, 110, 53, 1)',
        paddingVertical: 10,
        borderRadius: 8,
        color: '#FFF',
        justifyContent: 'center',
    },
    btnLogoutText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    /* section điều khoản sử dụng */
});