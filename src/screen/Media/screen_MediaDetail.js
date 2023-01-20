import {render, WebView} from 'react-native-webview';
import styles from './MediaStyles/screen_MediaDetail_style';

export default function MediaDetail({navigation, route}) {
  if(route.params == undefined) {
    var { link } = 'https://uel.edu.vn/tin-tuc/gap-mat-ky-niem-78-nam-ngay-thanh-lap-quan-doi-nhan-dan-viet-nam-va-33-nam-ngay-hoi-quoc-phong-toan-dan-22-12'
  }
  else {
    var { link } = route.params;
  }
    
  return <WebView source={{uri: link}} />;
}
