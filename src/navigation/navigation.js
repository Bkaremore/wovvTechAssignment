import React,{Component} from 'react';
import {View} from 'react-native';
import {createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import PostScreen from "../container/postScreen";
import  InfoScreen from '../container/infoScreen';

const appNavigator = createStackNavigator({
        PostScreen:PostScreen,
        InfoScreen:InfoScreen
    },
    {
        initialRouteName:'PostScreen'
    }
    );
const AppContainer = createAppContainer(appNavigator);

export  default class App extends Component{

    render() {
        return <AppContainer/>


    }
}