import { View, Text, SafeAreaView, Image, ActivityIndicator, Platform, PermissionsAndroid, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './_style'
import axios from 'axios'
import PARAMS from '../../constants/api_param_string'
import ICONS from '../../constants/default_icon_string'
import Colors from '../../assets/colors/Color'
import RNFetchBlob from 'rn-fetch-blob';
import NAVI_STRING from '../../constants/navigationString'
import { StackActions } from '@react-navigation/native'
// import {NativeModules} from 'react-native';
// const RNFetchBlob = NativeModules.RNFetchBlob;
const Photoview = ({ navigation, route }) => {
  const [largeImageURL, setURL] = useState('.')
  const [views, setViews] = useState(0)
  const [likes, setlikes] = useState(0)
  const [downloads, setDownloads] = useState(0)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    if (route.params?.imageId) {
      getImage()
    }
  }, [route.params?.imageId]);

  const getImage = async () => {
    setLoading(true)
    await axios.get(PARAMS.BASE_URL, {
      params: {
        key: PARAMS.SECRET_KEY,
        image_type: PARAMS.IMAGE_TYPE,
        pretty: PARAMS.PRETTY,
        id: route.params?.imageId
      },
    }).then((response) => {
      const responseImage = response.data.hits[0]

      console.log("id: " + responseImage.id)
      console.log("views: " + responseImage.views)
      console.log("likes: " + responseImage.likes)
      console.log("downloads: " + responseImage.downloads)

      setURL(responseImage.largeImageURL)
      setViews(responseImage.views)
      setlikes(responseImage.likes)
      setDownloads(responseImage.likes)
      setLoading(false)
    })
      .catch((err) => {
        console.log("Cannot load image! "+err)
      })

  }
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      // download
      downloadImage()
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'Application needs access to your storage to download Image',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("PERMISSION GRANTED");
          // download
          downloadImage()
        } else {
          console.log("DOWNLOAD SUCCESSFULLY!")
        }
      } catch (err) {
        console.warn(err)
      }
    }
  };

  const showToast = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  const downloadImage = () => {
    let date = new Date();
    let image_url = largeImageURL
    let ext = getExtention(image_url)
    ext = '.' + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.DCIMDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        description: 'Image Download From QuickImage',
      },
    };
    config(options)
      .fetch('GET', image_url)
      .then(res => {
        console.log('res ->', JSON.stringify(res));
        let msg = "Image Download Successfully!";
        showToast(msg);
      })

    function getExtention(filename) {
      return /[.]/.exec(filename) ?
        /[^.]+$/.exec(filename) : undefined;
    };
  }
  const closePhoto = () =>{
    console.log("CLOSED")
    navigation.navigate(NAVI_STRING.HOMEPAGE)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator
        size="large"
        animating={isLoading ? true : false}
        hidesWhenStopped={true}
        style={styles.indicator}
        color={Colors.LIGHT} />

        <TouchableOpacity style={styles.closePhotoBtn} onPress={closePhoto}>
          <Image style={{width:20,height:20}} source={ICONS.CLOSE} />
        </TouchableOpacity>
      
      <Image
        source={{ uri: largeImageURL }}
        style={styles.imagePhotoView} />

      <View style={styles.photoBar}>
        <TouchableOpacity onPress={checkPermission} style={styles.btnDownload}>
          <Image style={{ width: 25, height: 25 }} source={ICONS.DOWNLOADS} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnShare}>
          <Image style={{ width: 20, height: 20 }} source={ICONS.SHARE} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFavorites}>
          <Image style={{ width: 20, height: 20 }} source={ICONS.FAVORITES} />
        </TouchableOpacity>
      </View>
      <View style={styles.layoutRight}>
        <Image style={{ width: 15, height: 15, alignSelf: 'center' }} source={ICONS.FAVORITES} />
        <Text style={{ marginBottom: 5, color:Colors.LIGHT }}>{likes}</Text>
        <Image style={{ width: 15, height: 15, alignSelf: 'center' }} source={ICONS.VIEWS} />
        <Text  style={{color:Colors.LIGHT }}>{views}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Photoview