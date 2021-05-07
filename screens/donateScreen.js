
import React,{Component} from 'react';


import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {ListItem } from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/appHeader'

export default class DonateScreen extends Component {
  constructor(){
    super();
    this.state = {
      requestedBookList:[]
    }
    this.requestRef = null
  }
  getRequestedBookList = ()=> {
    this.requestRef = db.collection("Requested_Books").onSnapshot((snapshot)=>{
      var requestedBookList = snapshot.docs.map(document => document.data())
      this.setState({
        requestedBookList:requestedBookList
      })
    })
  }
  componentDidMount(){
    this.getRequestedBookList()
  }
  componentWillUnmount(){
    this.requestRef()
  }
  keyExtractor = (item,index)=>index.toString()
  renderItem = ({item,i})=>{
    return(
      <ListItem
      key = {i}
      title = {item.bookName}
      subtitle = {item.reason}
      titleStyle = {{color:"black",fontWeight:"bold"}}
      rightElement = {<TouchableOpacity style = {styles.button}>
        <Text style = {{color: "red"}}>
          View
        </Text>
      </TouchableOpacity>}
      bottomDivider/>
    )
  }
    render(){
  return (
  <View>
      <MyHeader title = "Donate Books"/>
      <View style = {{flex:1}}>
        {this.state.requestedBookList.length == 0?(<View style = {styles.subContainer}><Text style = {{fontSize: 20}}>List of all requested books</Text></View>):(
          <FlatList keyExtractor = {this.keyExtractor}
          data = {this.state.requestedBookList}
          renderItem = {this.renderItem}/>
        )}
      </View>
  </View>
  );
}}
const styles = StyleSheet.create({ 
  subContainer:{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' },
   button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 } } })