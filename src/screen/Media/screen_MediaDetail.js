import { render, WebView } from 'react-native-webview';
import styles from './MediaStyles/screen_MediaDetail_style';

export default function MediaDetail({ navigation, route }) {
  const scripts = `
  document.body.style.backgroundColor = '#ffffff';  
  document.querySelectorAll("p,div,span,a,em,strong").forEach((item) => item.style.fontSize = '2rem');
  document.querySelectorAll("img").forEach((item) =>item.style.width = '100%');
  document.querySelector("#pnCenterDisplay").style.width = '100%';
  document.querySelector(".content_detail").style.width = '100%';
  document.querySelector(".nd_detail").style.width = '100%';
  document.querySelector(".vien .wrapper table tbody tr:first-child").style.display = 'none';
  document.querySelector(".vien .wrapper table tbody tr:last-child").style.display = 'none';
  document.querySelector("#ctl08_rowCenter td:nth-child(2)").style.display = 'none';  
  `;
  if (route.params == undefined) {
    var { link } = 'https://uel.edu.vn/tin-tuc/gap-mat-ky-niem-78-nam-ngay-thanh-lap-quan-doi-nhan-dan-viet-nam-va-33-nam-ngay-hoi-quoc-phong-toan-dan-22-12'
  }
  else {
    var { link } = route.params;
  }

  return <WebView source={{ uri: link }}
    // injectedJavaScript={scripts}
    // javaScriptEnabledAndroid={true} 
    />;
}
