import {render, WebView} from 'react-native-webview';

export default function Ctxh() {
  const scripts = `
      document.querySelector("#home").style.display = 'none';
      document.querySelector("#services").style.display = 'none';
      document.querySelector("footer").style.display = 'none';
          `;
  const stCode = currentUser.key;
  const urlCtxh = 'https://ctxh.uel.edu.vn/?s=';
  return (
    <WebView
      injectedJavaScript={scripts}
      javaScriptEnabledAndroid={true}
      source={{uri: `${urlCtxh + stCode}`}}
    />
  );
}
