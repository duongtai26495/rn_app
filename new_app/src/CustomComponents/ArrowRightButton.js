import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ArrowRightButton extends Component {

    constructor(props){
        super(props);
    }


  render(){
    return (
        <TouchableOpacity onPress={this.props.onPress} style={{backgroundColor:this.props.backgroundSolidColor, paddingVertical:this.props.paddingV,...styles.container}}>
              <Text style={{color:this.props.colorText,...styles.buttonTitle}}>{this.props.titleButton}</Text>
                <Image style={styles.arrowImage} source={this.props.imageArrow} />
        </TouchableOpacity>
    )
  }

  
}

ArrowRightButton.propTypes = {
    titleButton: PropTypes.string.isRequired,
    colorText : PropTypes.string.isRequired,
    backgroundSolidColor: PropTypes.string.isRequired,
    imageArrow: PropTypes.number.isRequired,
    onPress:PropTypes.func,
    paddingV: PropTypes.number
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection:'row',
        borderRadius:55,
        paddingHorizontal:25,
        marginVertical:5,
    },

    buttonTitle: {
        fontSize: 15,
        alignSelf: 'flex-start',
        flex:1,
        alignSelf:'center',
    },
    arrowImage:{
        width:30,
        height:30,
        alignSelf:'flex-end'
    }
});

export default ArrowRightButton