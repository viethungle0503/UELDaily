import {render, WebView} from 'react-native-webview';
import styles from './HomeScreenStyles/screen_NewsDetail_style'

export default function NewsDetail({navigation, route}) {
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
    var {link} =
      'http://xn--thhtml-4r8b.vn/';
  } else {
    var {link} = route.params;
  }

  return (
    <WebView
      injectedJavaScript={scripts}
      javaScriptEnabledAndroid={true}
      source={{uri: link}}
    />
  );
}
