/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Setup from './src/Setup';


AppRegistry.registerComponent(appName, () => Setup);
