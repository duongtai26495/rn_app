import { Text, SafeAreaView, TouchableOpacity, Image, FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './_style'
import PARAMS from '../../constants/api_param_string'
import IMAGES from '../../constants/default_image_string'
const Orientation = ({ navigation, route }) => {
    const itemOrien = PARAMS.ORIENTATIONS
    const image = IMAGES.IMAGE_ORIENTATION
    let defaultImg = -1

    const itemRender = ({ item }) => {
        defaultImg++
        return (
            <TouchableOpacity
                style={styles.itemBtn}
                onPress={() => { navigation.goBack(route.params.onGoBack(item)) }}>

                <Image style={styles.itemBg} source={image[defaultImg]} />
                <Text style={styles.itemTitle}>{item}</Text>
                <TouchableOpacity style={{ borderRadius: 15, ...styles.layerBlack }} />
            </TouchableOpacity>
        )
    }
    const topComponent = () => {
        return (
            <TouchableOpacity style={styles.title}>
                <Image style={styles.imgTitle} source={PARAMS.ORIENTATION} />
                <Text style={styles.txtTitle}>{PARAMS.ORIENTATION}</Text>
                <TouchableOpacity style={styles.layerBlack} />
            </TouchableOpacity>
        )
    }
    const footerComponent = () => {
        return (
            <Text style={{ height: 20 }}></Text>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.flatlist}
                data={itemOrien}
                renderItem={itemRender}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    topComponent
                }
                ListFooterComponent={
                    footerComponent
                } />

        </SafeAreaView>
    )
}

export default Orientation