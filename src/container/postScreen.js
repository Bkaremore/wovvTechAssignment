import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import {Container, Body,Header,Left,Content, Card, CardItem} from 'native-base';

let timespan ;
class PostScreen extends Component{

    static navigationOptions=({navigation})=>({
        drawerLockMode: 'locked-closed',
        header: null,
    });

    constructor(props) {
        super(props);
        this.state= {
            page:0,
            loading:false,
            postData : [],
            searchValue:'',
            //isRefreshing:false
        }
    }
    componentDidMount() {
        this.getPost()
    }

    getPost = async () =>{
        try{
            let data =[];
            let response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.page}`)
             data = await response.json();
            console.log("data ==>",data.hits)

            this.setState({
                postData:data.hits,
                loading:false
            })

        }catch (e) {
          console.log("Error",e)
        }
    }

    _renderCard =({item, index})=>{
        //console.log("item ==>", item.title)
        if(this.filterCheck(item, index)){
            return(
                <View>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate("InfoScreen",{data:item})
                    }}>
                        <Content>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <View style={styles.row}>
                                            <Text style={styles.leftTxt}>Title : </Text>
                                            <Text ellipsizeMode= 'tail' style={{color:'#000'}}>{item.title}</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.leftTxt}>Url : </Text>
                                            <Text ellipsizeMode= 'tail' style={{color:'#000'}}>{item.url}</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.leftTxt}>Created At : </Text>
                                            <Text ellipsizeMode= 'tail' style={{color:'#000'}}>{item.created_at}</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.leftTxt}>Author : </Text>
                                            <Text ellipsizeMode= 'tail' style={{color:'#000'}}>{item.author}</Text>
                                        </View>

                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>

                    </TouchableOpacity>
                </View>
            );
        }else{
            return(<View/>)
        }
    }

    filterCheck = (item, index)=>{
        let allOk = false;

        if(item.title !=null && item.author != null && item.url != null){
             let title = item.title.toLowerCase();
             let author = item.author.toLowerCase();
             let url = item.url.toLowerCase();
             let inputValue = this.state.searchValue.toLowerCase();

             if(title.includes(inputValue) || author.includes(inputValue) || url.includes(inputValue)){
                  allOk = true
             }else{
                 allOk= false
             }
        }
        return allOk;
    }

    onRefreshing =()=>{

        clearInterval(timespan)
        this.setState({
            page:0
        })
        this.getPost(this.state.page++);

        setInterval(()=>{
            this.getPost(this.state.page++);
        }, 10000)
    }

    render() {
        let {postData,searchValue,loding} = this.state;
        return(
            <Container>
                <Header style={{backgroundColor:'#fff'}}>
                    <Body>
                        <Text style={{fontSize:22,fontWeight:'bold'}}>Post</Text>
                    </Body>
                </Header>

                <TextInput onChangeText={(text)=>{
                    this.setState({searchValue :text})
                }}
                            value={searchValue}
                            underlineColorAndroid={"#000"}
                           style={{margin:10}}
                           placeholder={'Search by Title, Url and Author '}
                />
                <TouchableOpacity>
                    <Image/>
                </TouchableOpacity>
                <FlatList data={postData}
                          keyExtractor={(item, index)=> {
                              index.toString()
                          }}
                          renderItem={(item,index)=>(
                            this._renderCard(item, index)
                           )
                }
                          refreshing={loading}
                          onRefresh={()=>{
                            this.onRefreshing()
                          }}
                          onEndReache={()=>{

                          }}
                          onEndReachedThreshold={0.5}
                />
            </Container>
        );
    }
}
export default PostScreen;

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        //justifyContent:'center'
    },
    leftTxt:{
        fontSize: 16,
        fontWeight:'bold'
    }
})