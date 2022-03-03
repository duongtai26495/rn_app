import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, ToastAndroid, Platform, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import styles from './_style'
import main_styles from '../../assets/styles/style'
import NAVI_STRING from '../../constants/navigationString'
import TITLE from '../../constants/title_string'
import IMAGES from '../../constants/default_image_string'
import { getAuth, updateProfile, updatePassword, onAuthStateChanged } from "firebase/auth";
import { StackActions } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker'
import Colors from '../../assets/colors/Color'
import { Dimensions } from "react-native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Switch } from 'react-native-paper'
import ICONS from '../../constants/default_icon_string'
const Profile = ({ navigation, route }) => {

  const width = Dimensions.get('window').width
  const widthComponent = (width / 1.3) * 4

  const [fullName, setFullName] = useState("")
  const [isChangePw, setChangPw] = useState(false)
  const [mailAddress, setMail] = useState("")
  const [urlImage, setUrlImage] = useState()
  const [isUpdateName, setUpdateName] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [newPassword, setNewPw] = useState("")
  const [newCPassword, setNewCPw] = useState("")
  const [isChangePhoto, setChangPhoto] = useState(false)
  const [previewImagePicker, setPreviewImagePicker] = useState()
  const [isPicked, setPicked] = useState(false)
  const [fileImageSelect, setFileImage] = useState()
  const [uid, setUID] = useState()
  const [isSavePhoto, setIsSavePhoto] = useState(false)
  const [isDarkMode, setDarkMode] = useState(false)
  const [isSafeResult, setSafeResult] = useState(true)
  const [selectLanguage, setLanguage] = useState(true)
  const cPwRef = useRef()
  const auth = getAuth()

  const toggleSwitchDarkMode = () => setDarkMode(previousState => !previousState)
  const toggleSwitchLang = () => setLanguage(previousState => !previousState)
  const toggleSwitchSafe = () => setSafeResult(previousState => !previousState)
  const toggleChangePw = () => setChangPw(previousState => !previousState)

  useEffect(() => {
    checkLogin()

    return (() => {
      setPreviewImagePicker(null)
      setUrlImage(null)
      setFileImage(null)
    })
  }, [isChangePhoto])

  const checkLogin = () => {
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        console.log(
          "USER LOGGED IN: " + user.email +
          "\nUSER DISPLAY NAME: " + user.displayName +
          "\nUSER ID : " + user.uid +
          "\nUSER PHOTO URL: " + user.photoURL)
        const displayName = user.displayName
        const mail = user.email
        const url = user.photoURL
        const uid = user.uid
        setUrlImage(url)
        setMail(mail)
        setFullName(displayName)
        setUID(uid)
        setLoading(false)
      } else {
        setLoading(false)
        navigation.dispatch(StackActions.replace(NAVI_STRING.AUTHEN))
      }
    })
  }

  const logOut = () => {
    setLoading(true)
    auth.signOut().then(() => {
      navigation.dispatch(StackActions.replace(NAVI_STRING.AUTHEN))
      setLoading(false)
    })
  }

  const updateDisplayName = () => {
    setLoading(true)
    if (fullName !== null && fullName !== "") {
      const currentUser = getAuth().currentUser
      updateProfile(currentUser, {
        displayName: fullName
      }).then(() => {
        console.log("UPDATED DISPLAY NAME: " + fullName)
        setUpdateName(false)
        setLoading(false)
      })
    }
  }

  const updateNewPW = () => {
    if (newPassword != "" || newCPassword != "") {
      if (newPassword == newCPassword) {
        setLoading(true)
        const auth = getAuth()
        const user = auth.currentUser
        const newPw = newPassword
        updatePassword(user, newPw).then(() => {
          setChangPw(false)
          showToast(TITLE.PW_IS_CHANGED)
          setLoading(false)
          console.log("Change pw success!")
        }).catch((err) => {
          showToast("Error: " + err)
          console.log("Change pw failure! " + err)
          setLoading(false)
        })
      } else {
        showToast(TITLE.PW_NOT_MATCH)
        setLoading(false)
      }
    } else {
      setChangPw(false)
    }

  }

  async function selectFromGallery() {
    ImagePicker.openPicker({
      width: widthComponent,
      height: (width / 2) * 4,
      cropping: true,
      mediaType: 'photo',
      includeExif: true,

    }).then(image => {
      const imagePath = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setPreviewImagePicker(imagePath)
      setFileImage(image)
      setPicked(true)
    })
  }

  async function takePictureFromCamera() {
    ImagePicker.openCamera({
      width: widthComponent,
      height: (width / 2) * 4,
      cropping: true,
      mediaType: 'photo',
      includeExif: true,

    }).then(image => {
      const imagePath = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setPreviewImagePicker(imagePath)
      setFileImage(image)
      setPicked(true)
    });
  }


  const uploadNewPhotoToStorage = async file => {
    setChangPhoto(true)
    const uri = file.path

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), "ProfileImage/" + uid + "/" + uid + "_photoUrl");
    const result = await uploadBytes(fileRef, blob);


    blob.close();

    if (result !== null) {

      console.log("Upload success!")
      getDownloadURL(fileRef).then((url) => {
        const currentUser = getAuth().currentUser
        updateProfile(currentUser, {
          photoURL: url
        }).then(() => {
          setChangPhoto(false)
          setPicked(false)
          setIsSavePhoto(false)

        })
      }).catch((err) => {
        console.log("Get link image failure! " + err)
      })
    }


  }

  const uploadNewPhoto = () => {
    setIsSavePhoto(true)
    if (previewImagePicker !== null && fileImageSelect !== null) {
      setUrlImage(previewImagePicker)
      uploadNewPhotoToStorage(fileImageSelect)
    }
  }

  const ButtonUploadImageComponent = () => {
    if (isPicked) {
      return (
        <TouchableOpacity onPress={() => { uploadNewPhoto() }} style={{ ...styles.bottomBtnCard, backgroundColor: Colors.SECONDARY }}>
          <Text style={styles.bottomTxtCard}>{TITLE.UPLOAD_THIS_PHOTO}</Text>
        </TouchableOpacity>
      )
    }
  }

  const showToast = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  const FunctionApplication = () => {
    return (
      <View style={styles.infoCard}>
        {/* <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textProfile}>
            {TITLE.DARK_MODE}
          </Text>
          <Switch
            style={styles.switchDarkMode}
            trackColor={{ false: Colors.BLACK, true: Colors.DARK }}
            thumbColor={isDarkMode ? Colors.SECONDARY : Colors.SMOKE}
            ios_backgroundColor={Colors.LIGHT}
            onValueChange={toggleSwitchDarkMode}
            value={isDarkMode} />
        </View> */}
        <View style={{ flexDirection: 'row'}}>
          <Text style={styles.textProfile}>
            {TITLE.SAFE_SEARCH}
          </Text>
          <Switch
            style={styles.switchDarkMode}
            trackColor={{ false: Colors.BLACK, true: Colors.DARK }}
            thumbColor={isSafeResult ? Colors.SECONDARY : Colors.SMOKE}
            ios_backgroundColor={Colors.LIGHT}
            onValueChange={toggleSwitchSafe}
            value={isSafeResult} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textProfile}>
            {TITLE.LANGUAGE}
          </Text>
          <Switch
            style={styles.switchDarkMode}
            trackColor={{ false: Colors.BLACK, true: Colors.DARK }}
            thumbColor={selectLanguage ? Colors.SECONDARY : Colors.SMOKE}
            ios_backgroundColor={Colors.LIGHT}
            onValueChange={toggleSwitchLang}
            value={selectLanguage} />
        </View>
      </View>
    )
  }

  const SelectImageComponent = () => {
    if (isChangePhoto) {
      return (
        <View style={styles.blurFullLayer}>
          <ActivityIndicator
            size={40}
            animationDuration={1500}
            color={Colors.PRIMARY}
            animating={isSavePhoto ? true : false}
            style={isSavePhoto ? main_styles.indicator : main_styles.stopIndicator}
            hidesWhenStopped={true} />

          <View style={styles.bottomCardView}>
            <Image style={styles.previewSelectedImage} source={{ uri: previewImagePicker }} />
            <Text style={styles.bottomCardTitle}>{TITLE.UPLOAD_PHOTO}</Text>
            <Text style={styles.bottomCardSubTitle}>{TITLE.CHOOSE_NEW_PICTURE}</Text>
            {ButtonUploadImageComponent()}
            <TouchableOpacity style={styles.bottomBtnCard} onPress={() => { takePictureFromCamera() }}>
              <Text style={styles.bottomTxtCard}>{TITLE.TAKE_PHOTO}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomBtnCard} onPress={() => { selectFromGallery() }}>
              <Text style={styles.bottomTxtCard}>{TITLE.FROM_LIBRARY}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomBtnCard} onPress={() => { setChangPhoto(false), setPicked(false) }}>
              <Text style={styles.bottomTxtCard}>{TITLE.CANCEL}</Text>
            </TouchableOpacity>
          </View>

        </View>
      )

    }
  }

  const UpdateNameComponent = () => {
    if (!isUpdateName) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.fullNameProfile}>{fullName === null ? TITLE.UPDATE_Y_NAME : fullName}</Text>
          <TouchableOpacity onPress={() => { setUpdateName(true) }} style={{ alignSelf: 'center' }}>
            <Image source={ICONS.EDIT} style={{ width: 20, height: 20, marginStart: 15 }} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            autoCapitalize='words'
            value={fullName} style={styles.inputNewName}
            onChangeText={(fullName) => { setFullName(fullName) }}
            placeholder={TITLE.UPDATE_Y_NAME}
            placeholderTextColor={Colors.PRIMARY} />
          <TouchableOpacity onPress={updateDisplayName} style={{ alignSelf: 'center' }}>
            <Image source={ICONS.OKAY} style={{ width: 30, height: 30, marginStart: 15 }} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  const UpdatePasswordComponent = () => {
    if (isChangePw) {
      return (
        <View>
          <TextInput
            secureTextEntry={true}
            style={styles.inputNewName}
            onChangeText={(newPassword) => { setNewPw(newPassword) }}
            placeholder={TITLE.NEW_PW}
            placeholderTextColor={Colors.DARK}
            returnKeyType={"next"}
            onSubmitEditing={() => { cPwRef.current.focus() }} />
          <TextInput
            ref={cPwRef}
            secureTextEntry={true}
            style={styles.inputNewName}
            onChangeText={(newCPassword) => { setNewCPw(newCPassword) }}
            placeholder={TITLE.NEW_C_PW}
            placeholderTextColor={Colors.DARK} />

          <TouchableOpacity style={styles.btnChangeProfile} onPress={updateNewPW}>
            <Text style={{ color: Colors.LIGHT, alignSelf: 'center', fontWeight: 'bold', marginVertical: 3 }}>{TITLE.UPDATE}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.backgroundView} source={IMAGES.BG_BLUR[4]} />
      <TouchableOpacity style={{ backgroundColor: 'rgba(255,255,255,0.2)', position: 'absolute', width: '100%', height: '100%', zIndex: 9 }} />
      <ScrollView
        style={{ zIndex: 10, }}>
        <ActivityIndicator
          size={40}
          animationDuration={1500}
          color={Colors.PRIMARY}
          animating={isLoading ? true : false}
          style={isLoading ? main_styles.indicator : main_styles.stopIndicator}
          hidesWhenStopped={true} />

        <TouchableOpacity style={styles.tabImageProfile} onPress={() => { setChangPhoto(true) }}>
          <Image style={styles.userProfileImage} source={{ uri: urlImage }} />
        </TouchableOpacity>

        <View style={styles.infoCard}>
          {UpdateNameComponent()}
          <Text style={styles.textProfile}>{mailAddress}</Text>
        </View>

        {FunctionApplication()}

        <View style={styles.infoCard}>
          <TouchableOpacity onPress={() => { toggleChangePw() }}>
            <Text style={styles.textProfile}>{TITLE.CHANGE_PASSWORD}</Text>
          </TouchableOpacity>
          {UpdatePasswordComponent()}
        </View>

          <TouchableOpacity
            onPress={logOut}
            style={{ marginStart: 2, ...styles.btnSignOut }}>
            <Text style={styles.titleButton}>{TITLE.SIGNOUT}</Text>
          </TouchableOpacity>
      </ScrollView>
      {SelectImageComponent()}
    </SafeAreaView>
  )
}

export default Profile