import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Body} from 'native-base';

let navData=[]

class InfoScreen extends Component{

    componentWillMount() {

        if(this.props.navigation.getParam('data') !== null){
             navData = this.props.navigation.getParam('data');
            console.log("navData ==>",navData)
        }
    }

    render() {
        return(
            <Container>
                <Body style={{margin:10}}>
                    <View style={styles.row}>
                        <Text style={styles.leftTxt}>Title : </Text>
                        <Text ellipsizeMode= 'tail' style={{color:'#000'}}>{navData.title}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.leftTxt}>Url : </Text>
                        <Text ellipsizeMode= 'tail' style={{color:'#000'}}>{navData.url}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.leftTxt}>Created At : </Text>
                        <Text ellipsizeMode= 'tail' style={{color:'#000'}}>{navData.created_at}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.leftTxt}>Author : </Text>
                        <Text ellipsizeMode= 'tail' style={{color:'#000'}}>{navData.author}</Text>
                    </View>

                </Body>
            </Container>
        );
    }
}
export  default InfoScreen;
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'flex-start',

    },
    leftTxt:{
        fontSize: 16,
        fontWeight:'bold'
    }
})