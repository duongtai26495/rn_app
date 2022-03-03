import { StyleSheet, Dimensions } from "react-native";
import Colors from '../../assets/colors/Color'
import  { View, Text } from 'react-native'
import React from 'react'
import { bool } from "prop-types";
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const _style = StyleSheet.create({
  container:{
    backgroundColor: Colors.LIGHT,
    flex:1,
  },
  topHeader:{
    width:'100%',
    height:height/10,
    backgroundColor:Colors.PRIMARY,
    justifyContent:'center'
  },
  headerTitle:{
    color:Colors.WHITE,
    fontSize:20,
    fontWeight:'bold',
    alignSelf:'center',
  },
  imageFavList:{

  },
  buttonDelete:{

  },
  imageUnLogin:{
    width:'100%',
    height:width/2
  },
  txtFav : {
    color:Colors.DARK,
    fontSize:20,
    fontWeight:'bold',
    alignSelf:'center',
    marginVertical:50,
  },
  warningLogin:{
    padding:'5%'
  },

})

export default _style