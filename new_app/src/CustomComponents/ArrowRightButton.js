import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ArrowRightButton extends Component {

    constructor(props){
        super(props);
    }


  render(){
    return (
        <TouchableOpacity onPress={this.props.onPress} style={{backgroundColor:this.props.backgroundSolidColor,...styles.container}}>
              <Text style={{color:this.props.colorTitle,...styles.buttonTitle}}>{this.props.title}</Text>
                <Image style={styles.arrowImage} source={this.props.imageArrow} />
        </TouchableOpacity>
    )
  }

  
}

ArrowRightButton.propTypes = {
    title: PropTypes.string.isRequired,
    colorTitle : PropTypes.string.isRequired,
    backgroundSolidColor: PropTypes.string.isRequired,
    imageArrow: PropTypes.number.isRequired,
    onPress:PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection:'row',
        borderRadius:55,
        paddingVertical:10,
        paddingHorizontal:25,
        marginVertical:5,
    },

    buttonTitle: {
        fontSize: 15,
        alignSelf: 'flex-start',
        flex:1,
        alignSelf:'center'
    },
    arrowImage:{
        width:30,
        height:30,
        alignSelf:'flex-end'
    }
});

export default ArrowRightButton