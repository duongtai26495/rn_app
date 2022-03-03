import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, Button, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ICONS from '../../constants/default_icon_string'
import NAVI_STRING from '../../constants/navigationString'
import TITLE from '../../constants/title_string'
import IMAGES from '../../constants/default_image_string'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, onValue } from "firebase/database";
import ArrowRightButton from '../../CustomComponents/ArrowRightButton'
import styles from './_style'
import Colors from '../../assets/colors/Color'
import { StackActions } from '@react-navigation/native'
const Favorites = ({ navigation, route }) => {
  const [listFavImage, setListFavImage] = useState([])
  const [userID, setUserID] = useState()
  const [isLogin, setIsLogin] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const auth = getAuth();
  useEffect(() => {
    checkLogin()
    return (() => {

    })
  },)


  const checkLogin = () => {
    const thisUser = auth.currentUser;
    if (thisUser !== null) {
      const userID = thisUser.uid
      setUserID(userID)
      setIsLogin(true)
      console.log("User ID: " + userID)
    } else {
      setIsLogin(false)
      console.log("User do not login!")
    }

  }

  const getFavImages = async () => {
    const database = getDatabase()
    const starCountRef = ref(database, "Favorites/" + userID + "/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      updateStarCount(postElement, data);
    });
  }

  const title = TITLE.FAVORITES_TITLE.toUpperCase()

  const itemRender = ({ item }) => {
    return (
      <TouchableOpacity>
        <Image source={ICONS.CLOSE} style={styles.buttonDelete} />
        <Image source={item.webformatURL} style={styles.imageFavList} />
      </TouchableOpacity>
    )
  }


  const gotoProfile = () => {
    navigation.navigate(NAVI_STRING.USERPROFILE)
  }

  const noImage = () => {
    return (
      <Text style={styles.txtPage}>
        No image found
      </Text>
    )
  }
  const topComponent = () => {
    return (
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    )
  }
  const onRefresh = () => {
    setIsFetching(true);

  };

  const unLoginComponent = () => {
    return (
      <ScrollView>
        {topComponent()}
        <Image source={IMAGES.SAD} style={styles.imageUnLogin} />
        <View style={styles.warningLogin}>
          <Text style={styles.txtFav}>You do not login</Text>
          <ArrowRightButton
            titleButton={TITLE.LOGIN_NOW}
            imageArrow={ICONS.ARROW_GO}
            backgroundSolidColor={Colors.DARK}
            colorText={Colors.LIGHT}
            onPress={gotoProfile}
            paddingV={10} />
        </View>
      </ScrollView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {isLogin ? (
          <FlatList
            data={listFavImage}
            renderItem={itemRender}
            ListHeaderComponent={
              topComponent
            }
            ListEmptyComponent={
              noImage
            }
            onRefresh={onRefresh}
            refreshing={isFetching}
          />
        ) :
          (
            unLoginComponent()
          )}
      </View>
    </SafeAreaView>
  )
}

export default Favorites