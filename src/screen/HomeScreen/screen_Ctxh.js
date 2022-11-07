import {render, WebView} from 'react-native-webview';

export default function Ctxh() {
  const stCode = 'K204061426';
  const urlCtxh = 'https://ctxh.uel.edu.vn/?s=';
  return <WebView source={{uri: `${urlCtxh + stCode}`}} />;
}
