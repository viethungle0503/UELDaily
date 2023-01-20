import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
        backgroundColor: '#F6F8FE',
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        marginBottom: 50,
    },
    hwItem: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderLeftColor: '#7BAFFF',
        borderLeftWidth: 3,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        shadowColor: 'rgb(0, 101, 255)',
        shadowOffset: {
            width: 0,
            height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 2,
    },

    hwtext_subject: {
        color: '#625F5F',
        fontSize: 15,
    },
    hwtext_topic: {
        color: '#252525',
        fontSize: 17,
        fontWeight: '600',
        paddingBottom: 3,

    },
    hwtext_schedule_danger: {
        color: '#FF6E35',
        fontWeight: '500',
        width: 250,

    },
    hwtext_schedule_warning: {
        color: '#FCCD41',
        fontWeight: '500',
        width: 250,
    },
    hwtext_schedule_normal: {
        color: '#40CFF7',
        fontWeight: '500',
        width: 250,
    },
    timedueContainer: {
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
    timedue_danger: {
        backgroundColor: '#FF6E35',
    },
    timedue_warning: {
        backgroundColor: '#FCCD41',
    },
    timedue_normal: {
        backgroundColor: '#40CFF7',
    },
    timedueIcon: {
        height: 18,
        width: 18,
        marginRight: 3,
    },
    timedueText: {
        color: '#FFF',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    }
});