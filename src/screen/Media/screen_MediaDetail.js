import { WebView } from 'react-native-webview';

export default function MediaDetail({ navigation, route }) {
  const scripts = `
  document.body.style.backgroundColor = '#ffffff';  
  document.querySelectorAll("p,div,span,a,em,strong").forEach((item) => item.style.fontSize = '2rem');
  document.querySelectorAll("img").forEach((item) =>item.style.width = '100%');
  

  document.querySelector(".pagePhongBan .transparent .wrapper table tbody tr:first-child").style.display = 'none';
  document.getElementById("pnBottom").parentElement.parentElement.style.display = 'none'
  
  document.querySelector("#pnCenterDisplay").style.width = '100%';
  document.querySelector(".content_detail").style.width = '100%';
  document.querySelector(".nd_detail").style.width = '100%';
  document.querySelector(".nd_detail").style.maxWidth = '100%';
  document.getElementById("pnRight").parentElement.remove(); 
  `;
  if (route.params == undefined) {
    var { link } = 'https://uel.edu.vn/tin-tuc/gap-mat-ky-niem-78-nam-ngay-thanh-lap-quan-doi-nhan-dan-viet-nam-va-33-nam-ngay-hoi-quoc-phong-toan-dan-22-12'
  }
  else {
    var { link } = route.params;
  }

  return <WebView
    userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
    useWebView2={true}
    injectedJavaScript={scripts}
    javaScriptEnabledAndroid={true}
    startInLoadingState={true}
    source={{ uri: link }}
  />;
}
