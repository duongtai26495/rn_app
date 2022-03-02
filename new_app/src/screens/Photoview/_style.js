import { StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Color from '../../assets/colors/Color'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const _style = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',
        width:'100%',
        backgroundColor: Color.DARK,
        justifyContent: 'center',
    },
    imagePhotoView: {
        width:'100%',
        height: '100%',
        resizeMode:'contain',
    },
    indicator: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    photoBar:{
        bottom:0,
        width:'100%',
        paddingVertical:5,
        position:'absolute',
        flexDirection:'row',
        borderTopStartRadius:15,
        borderTopEndRadius:15,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    btnDownload:{
        width:'100%',
        height:30,
        justifyContent:'center',
        flex:1,
        alignItems:'center'
    },
    btnShare:{
        width:'100%',
        height:30,
        justifyContent:'center',
        flex:1,
        alignItems:'center'
    },
    btnFavorites:{
        width:'100%',
        height:30,
        justifyContent:'center',
        flex:1,
        alignItems:'center'
    },
    layoutRight:{
        padding:10,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
        position:'absolute',
        right:0,
        top:height/3,
        justifyContent:'center',
        alignItems:'center',
    },
    scrollviewPhoto:{
        height:'100%',
        width:'100%',
        flex:1,
    },
    closePhotoBtn:{
        position:'absolute',
        width:20,
        height:20,
        top:20,
        right:20,
        zIndex:20
    }
})

export default _style