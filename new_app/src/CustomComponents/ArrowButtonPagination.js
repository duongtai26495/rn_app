import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Colors from '../assets/colors/Color';
import IMAGES from '../constants/default_image_string';
import ICONS from '../constants/default_icon_string';

class ArrowButtonPagination extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <TouchableOpacity onPress={this.props.activeFunc} style={(this.props.navigateFunc === 'next' ? styles.btnPageNext : (this.props.pageNumber > 1 ? styles.btnPagePrev : styles.btnDisabled))}>
                <Image style={styles.paginImage} source={this.props.navigateFunc === 'next' ? ICONS.NEXT : ICONS.PREV} />    
            </TouchableOpacity>
        )
    }


}

ArrowButtonPagination.propTypes = {
    navigateFunc: PropTypes.string,
    pageNumber: PropTypes.number.isRequired,
    activeFunc:PropTypes.func
};

const styles = StyleSheet.create({
    btnPageNext: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        padding:5,
        backgroundColor:Colors.SECONDARY,
        borderRadius: 10,
        elevation:3,
        shadowColor:Colors.DARK
    },
    btnPagePrev:{
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        padding:5,
        backgroundColor:Colors.LIGHT,
        borderRadius: 10,
        elevation:5,
        shadowColor:Colors.DARK
    },
    btnDisabled: {
        width: '100%',
        flex: 1,
        backgroundColor: Colors.SMOKE,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        padding:5,
        borderRadius: 10,
    },
    paginImage: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        zIndex: 1,

    },

    paginBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        height: 30,
    }
});

export default ArrowButtonPagination