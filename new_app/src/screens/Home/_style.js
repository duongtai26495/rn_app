import { StyleSheet, Dimensions } from "react-native";
import Colors from '../../assets/colors/Color'
import { View, Text } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const _style = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  buttonSearch: {
    width: 15,
    height: 15,
    zIndex:1,
  },
  button: {
    width: 35,
    height: 35,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },


  flatlist: {
    width: '100%',
    height: '100%',
    flex: 1,
  },

  searchForm: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:5,
    backgroundColor: Colors.LIGHT,
    elevation:5,
    shadowColor:Colors.DARK,
  },
  searchInput: {
    flex: 1,
    fontWeight:'bold',
    color: Colors.DARK,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageButton: {
    width: '45%',
    margin: 5,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  txtPage: {
    color: Colors.DARK,
    alignSelf: 'center',
    alignContent: 'center',
    fontSize: 10,
    paddingHorizontal:10,
    fontWeight:'bold',
    zIndex:1,
  },
  selectCate: {
    marginEnd: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

 

  paginTab: {
    paddingVertical: 5,
    flexDirection: 'row',
    width:width,
  },
  
  labelSwitch: {
    color: Colors.DARK,
    fontWeight:'bold',
    fontSize: 12,
  },
  tabSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT,
    padding: 5,
    borderRadius: 5,
    marginBottom: 2,
  },

  btnCategory: {
    padding: 5,
    backgroundColor: Colors.PRIMARY,

  },
  bgButton: {
    height: 35,
    width: '100%',
    borderRadius: 10,
    position: 'absolute',
  },

  layerBlack:{
   width:'100%',
   height:'100%',
   position:'absolute',
   backgroundColor:'rgba(0,0,0,0.1)',
  },
  selectOrienBanner:{
    flexDirection:'row',
    justifyContent:'center',
  },
  btnOrienSelect:{
    flex:1,
    width:'100%',
    height:width/10,
    backgroundColor:Colors.LIGHT,
    justifyContent:'center',
    elevation:3,
    shadowColor:Colors.DARK,
    margin:5,
    borderRadius:15,
  },
  titleOrienSelect:{
    color:Colors.PRIMARY,
    fontWeight:'bold',
    alignSelf:'center',
  }
})

export default _style