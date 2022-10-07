import {
    View,
    Text,
    StyleSheet,
    Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    GoogleSignin,
  } from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth';

const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
      dispatch(setloggedIn(false));
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };


export default function Home() {
    const { user, loggedIn } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    return(
        <View>
            {
            loggedIn && (
                <View style={styles.buttonContainer}>
                  <Text style={styles.text}>Welcome {user.displayName}</Text>
                  <Button
                    onPress={signOut}
                    title="LogOut"
                    color="red"></Button>
                </View> 
            )
        }
        </View>
        
            
    );
                     
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
      },
    text: {
        fontSize:25,
        color:'yellow',
    }
});