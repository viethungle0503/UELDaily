import { WebView } from 'react-native-webview';

export default function NewsDetail({ navigation, route }) {
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
    var { link } =
      'http://xn--thhtml-4r8b.vn/';
  } else {
    var { link } = route.params;
  }
  if ((link.search("lms-uel.thanhbinhbent.com") != -1)) {
    return (
      <WebView
        userAgent={Platform.OS === 'android' ? 'Chrome/18.0.1025.133 Mobile Safari/535.19' : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'}
        useWebView2={true}
        startInLoadingState={true}
        source={{ uri: link }}
      />
    )
  }
  else {
    return (
      <WebView
        userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
        useWebView2={true}
        injectedJavaScript={scripts}
        javaScriptEnabledAndroid={true}
        startInLoadingState={true}
        source={{ uri: link }}
      />
    );
  }

}
