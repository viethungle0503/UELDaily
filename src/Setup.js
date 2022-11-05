import App from './App';
import Auth from '@react-native-firebase/auth';


const Setup = () => {
    global.auth = Auth;
    // global.reference = DataBase.app().database("https://ueldaily-hubing-default-rtdb.asia-southeast1.firebasedatabase.app/")
    return <App/>
};

export default Setup;