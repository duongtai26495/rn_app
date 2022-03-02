import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import Colors from '../assets/colors/Color';
import ICONS from '../constants/default_icon_string';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
/**
* @author Duong Tai
* @function ImageItem
**/
class ImageHorizontalItem extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={styles.imageBox}>
                <Image style={styles.imageHomeHorizontal} source={{ uri: this.props.imageUrl }} />
                <View style={styles.labelItem}>
                    <Image style={{ width: 15, height: 15, marginEnd: 5, }} source={ICONS.LIKES} />
                    <Text style={styles.textImage}>{this.props.imageLikes}</Text>
                </View>
            </View>
        )
    }
   
}

ImageHorizontalItem.protoTypes = {
    imageUrl: PropTypes.string.isRequired,
    imageLikes: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
    imageHomeHorizontal: {
        width: '95%',
        height: height / 6,
        borderRadius: 10,
      },
    imageBox: {
        width: width / 2,
        marginBottom: 10,
        paddingHorizontal: 2,
        alignItems: 'center',
        marginVertical:5,
        justifyContent:'center',
      },
    labelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 5,
        position: 'absolute',
        bottom: 0,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        width: '95%',
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    textImage: {
        color: Colors.LIGHT,
    },
})

export default ImageHorizontalItem