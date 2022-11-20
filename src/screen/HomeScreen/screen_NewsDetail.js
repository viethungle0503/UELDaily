import {render, WebView} from 'react-native-webview';

export default function NewsDetail({navigation, route}) {
    const { link } = route.params;
  return <WebView source={{uri: link}} />;
}
