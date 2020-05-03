/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import App from './src/navigation/navigation';
import PostScreen from "./src/container/postScreen";

AppRegistry.registerComponent(appName, () => App);
