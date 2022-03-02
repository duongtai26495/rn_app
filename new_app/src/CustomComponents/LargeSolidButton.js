import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import Colors from '../assets/colors/Color';

class LargeSolidButton extends Component {

    constructor(props){
        super(props);
    }


  render(){
    return (
        <TouchableOpacity onPress={this.props.onPress} style={{backgroundColor:this.props.backgroundSolidColor,...styles.container}}>
            <Text style={{color:this.props.colorTitle,...styles.buttonTitle}}>{this.props.title}</Text>
        </TouchableOpacity>
    )
  }

  
}

LargeSolidButton.propTypes = {
    title: PropTypes.string.isRequired,
    colorTitle : PropTypes.string.isRequired,
    backgroundSolidColor: PropTypes.string.isRequired,
    onPress:PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        margin: 5,
        elevation: 3,
        shadowColor: Colors.DARK,
        padding: 5
    },

    buttonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',

    }
});

export default LargeSolidButton