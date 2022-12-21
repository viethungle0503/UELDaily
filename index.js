/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Setup from './src/Setup';
/* polyfills */
/** URL polyfill */
import 'react-native-url-polyfill/auto';


AppRegistry.registerComponent(appName, () => Setup);
