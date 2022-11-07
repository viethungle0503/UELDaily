import React from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    Table
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LogOutButton from '../../components/Button_LogOut';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setUser, setLoggedIn, setUID } from '../../redux_toolkit/userSlice';

export default function Homework() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const loggedIn = useSelector((state) => state.user.loggedIn);
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth()
                .signOut()
                .then(() => {
                    dispatch(setLoggedIn(false));
                    dispatch(setUser([]));
                });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <View>
            <Text>UEL LMS</Text>
            {
                loggedIn && (
                    <View style={styles.buttonContainer}>
                        <Text style={{ color: 'red' }}>{database_app[0].data.email}</Text>
                        {
                            user && <Text style={styles.text}>Welcome {user.displayName}</Text>
                        }
                        <LogOutButton
                            onPressFunction={signOut}
                            title={loggedIn ? 'Log out' : 'You are logged in'}
                            color="#FFF6D5"
                        >
                        </LogOutButton>
                        <Image
                            style={{ width: 150, height: 150 }}
                            source={{ uri: user.photoURL }} />
                    </View>
                )
            }
            {/* <FlatList
                data={tableData}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.key}s</Text>
                        <Text>{item.data.email}</Text>
                        <Text>{item.data.fullName}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()} /> */}
        </View>
    )
};
const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 25,
        color: '#21D463',
    }
});
