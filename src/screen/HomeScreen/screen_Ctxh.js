import {render, WebView} from 'react-native-webview';
import {
  setUser,
  setLoggedIn,
  setUID,
  setCurrentUser,
} from '../../redux_toolkit/userSlice';

export default function Ctxh() {
  const stCode = currentUser.key;
  const urlCtxh = 'https://ctxh.uel.edu.vn/?s=';
  return <WebView source={{uri: `${urlCtxh + stCode}`}} />;
}
