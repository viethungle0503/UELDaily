import {render, WebView} from 'react-native-webview';
import { useSelector } from 'react-redux';

export default function Ctxh() {
  const currentUser = useSelector(state => state.user.currentUser);
  const scripts = `
      document.querySelector("#home").style.display = 'none';
      document.querySelector("#services").style.display = 'none';
      document.querySelector("footer").style.display = 'none';
          `;
  const stCode = currentUser.id;
  const urlCtxh = 'https://ctxh.uel.edu.vn/?s=';
  return (
    <WebView
      injectedJavaScript={scripts}
      javaScriptEnabledAndroid={true}
      source={{uri: `${urlCtxh + stCode}`}}
    />
  );
}
