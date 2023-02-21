import { StyleSheet } from "react-native";
export default StyleSheet.create({
    body: {
        paddingTop: 20, 
        backgroundColor: '#F6F8FE',
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
    
        marginBottom: 50,
    },
    hwItem:{
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderLeftColor: '#7BAFFF',
        borderLeftWidth: 2,
    
        paddingHorizontal: 15,
        paddingVertical: 20,

        marginVertical: 9,
    
        shadowColor: 'rgb(0, 101, 255)',
        shadowOffset: {
          width: 0,
          height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    
        elevation: 2,
    },
    hwItem_late:{
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderLeftColor: '#FFCCB3',
        borderLeftWidth: 2,

        paddingHorizontal: 15,
        paddingVertical: 20,

        marginVertical: 9,
        shadowColor: 'rgba(255, 150, 124, 0.8)',
        shadowOffset: {
            width: 0,
            height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 2,
    },
    
    hwtext_subject:{
        color: '#625F5F',
        fontSize: 15,
        paddingBottom: 6
    },
    hwtext_topic:{
        color: '#252525',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 6, 
    
    },
    hwtext_schedule:{
        color: '#0065FF',
        fontWeight: '500',
        width: '75%',
    },
   
    hwtext_schedule_late:{
        color: '#EB5A46',
        fontWeight: '500',
        width: '75%',
    },
   
    timedueContainer:{
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 3,

        backgroundColor: '#0065FF'

    },
    timedueContainer_late:{
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 3,

        backgroundColor: '#EB5A46'

    },
 
    timedueIcon:{
        height: 18,
        width: 18,
        marginRight: 3,
    },
    timedueText:{
        color: '#FFF',
    
    },
    
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    
    }
    });