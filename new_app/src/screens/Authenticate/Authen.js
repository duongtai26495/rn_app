import { Dimensions,View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Switch, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import authen_styles from '../../assets/styles/authen'
import Colors from '../../assets/colors/Color'
import NAVI_STRING from '../../constants/navigationString'
import IMAGES from '../../constants/default_image_string'
import ICONS from '../../constants/default_icon_string'
import TITLE from '../../constants/title_string'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth'
import main_styles from '../../assets/styles/style'
import { LogBox } from 'react-native';
import { StackActions } from '@react-navigation/native';
import ArrowRightButton from '../../CustomComponents/ArrowRightButton'
import { Button } from 'react-native-paper'
import style from '../../assets/styles/style'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Authen = ({ navigation, route }) => {
  
  const height = Dimensions.get('window').height

  const mailRef = useRef()
  const passwordRef = useRef()
  const loginRef = useRef()
  const submitRef = useRef()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [recoveryMail, setRecoveryMail] = useState("")
  const [notifiReco, setNotifi] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [isRemember, setRemember] = useState(false)
  const [isForget, setForget] = useState(false)
  const [isResetPW, setResetPW] = useState(false)
  const [isSendmail, setIsSendMail] = useState(false)
  const [isLoadingSendMail, setLoadingSendMail] = useState(false)

  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const toggleSwitch = () => {
    setRemember(previousState => !previousState)
  };
  const toggleSwitchForgetPw = () => {
    setForget(previousState => !previousState)
  }

  const toggleSwitchResetPw = () => {
    setResetPW(previousState => !previousState)
  }


  const showToast = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  }
  const signIn = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        setLoading(false)
        navigation.dispatch(StackActions.replace(NAVI_STRING.USERPROFILE))
      })
      .catch((err) => {
        console.log("Sign in error: " + err)
        setLoading(false)
      })
  }

  const signUp = () => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, username, password)
      .then(() => {
        setLoading(false)
        navigation.dispatch(StackActions.replace(NAVI_STRING.USERPROFILE))
      }).catch((err) => {
        console.log("Sign up error: " + err)
        setLoading(false)
      })
  }

  function signInWithGoogle() {
    setLoading(true)
    signInWithRedirect(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user

        setLoading(false)
        navigation.dispatch(StackActions.replace(NAVI_STRING.USERPROFILE))
      }).catch((err) => {
        console.log("Error: " + err)
        setLoading(false)
      })
  }

  const notifiRecoveryComponent = () => {
    if (isSendmail) {
      return (
        <Text style={authen_styles.notifiText}>
          {notifiReco}
        </Text>
      )

    }
  }

  const sendRecoveryMail = () => {
    setLoadingSendMail(true)
    setIsSendMail(true)
    if (recoveryMail !== null || recoveryMail !== "") {
      sendPasswordResetEmail(auth, recoveryMail)
        .then(() => {
          setUsername(recoveryMail)
          setNotifi(TITLE.RECOVERYMAIL_SENDED)
          setLoadingSendMail(false)
          setResetPW(false)
        })
        .catch((error) => {
          setLoadingSendMail(false)
          setResetPW(false)
          setNotifi("HAS ERROR: " + errorMessage)
          const errorCode = error.code;
          const errorMessage = error.message;
          showToast()
          console.log("Error recovery: " + errorCode + "\nError message: " + errorMessage)
        });
    }

  }

  const sendRecoveryMailComponent = () => {
    if (isResetPW) {
      return (
        <View>
          <TextInput
            returnKeyType={"next"}
            onSubmitEditing={() => { submitRef.current.focus() }}
            style={{ ...authen_styles.fieldStyle, color: Colors.DARK }}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            placeholderTextColor={Colors.DARK_MID}
            textContentType="emailAddress"
            selectTextOnFocus={true}
            onChangeText={(recoveryMail) => setRecoveryMail(recoveryMail)}
            placeholder={TITLE.MAIL}
            underlineColorAndroid={Colors.DARK_MID} />

          <TouchableOpacity onPress={() => { sendRecoveryMail() }} ref={submitRef} style={authen_styles.buttonSend}>
            <Text style={authen_styles.txtSend}>{TITLE.SUBMIT}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  const bottomNeedHelp = () => {
    if (isForget) {
      return (
        <TouchableOpacity onPress={() => { setForget(false), setIsSendMail(false) }} style={authen_styles.tabNeedHelp} >
          <View style={authen_styles.tabNeedHelpFunction}>

            <ActivityIndicator
              size={40}
              animationDuration={1500}
              color={Colors.PRIMARY}
              animating={isLoadingSendMail ? true : false}
              hidesWhenStopped={true} />
            {notifiRecoveryComponent()}
            
            <TouchableOpacity onPress={toggleSwitchResetPw}>
              <Text style={authen_styles.txtNeedHelp}>{TITLE.FORGET_PW}</Text>
            </TouchableOpacity>

            {sendRecoveryMailComponent()}

            <TouchableOpacity>
              <Text style={authen_styles.txtNeedHelp}>{TITLE.ABOUT_APP}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>


      )
    }
  }

  return (
    <SafeAreaView style={authen_styles.container} >
      <Image style={authen_styles.backgroundView} source={IMAGES.BG_BLUR[3]} />
      <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.05)', position: 'absolute', width: '100%', height: '100%', zIndex: 9 }} />
      <View>
        <ScrollView style={{ zIndex: 10 }} >

          <ActivityIndicator
            size={40}
            animationDuration={1500}
            color={Colors.PRIMARY}
            animating={isLoading ? true : false}
            style={isLoading ? main_styles.indicator : main_styles.stopIndicator}
            hidesWhenStopped={true} />
          <View style={authen_styles.welcomeBanner}>
            <Text style={authen_styles.registerTitle}>{TITLE.WELCOME}</Text>
          </View>

          <View style={authen_styles.fieldRegisterTab}>

            <TextInput
              returnKeyType={"next"}
              ref={(input) => { mailRef }}
              onSubmitEditing={() => { passwordRef.current.focus() }}
              style={authen_styles.fieldStyle}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              value={username}
              placeholderTextColor={Colors.WHITE}
              onChangeText={(username) => setUsername(username)}
              placeholder={TITLE.MAIL}
              underlineColorAndroid={Colors.WHITE} />
            <TextInput
              ref={passwordRef}
              returnKeyType={"next"}
              onSubmitEditing={() => { loginRef.current.focus() }}
              secureTextEntry={true}
              style={authen_styles.fieldStyle}
              placeholderTextColor={Colors.WHITE}
              onChangeText={(password) => setPassword(password)}
              placeholder={TITLE.PASSWORD}
              underlineColorAndroid={Colors.WHITE} />

            <View style={authen_styles.tabSwitchRemember}>
              <Text style={authen_styles.labelSwitchRemember}>
                {TITLE.REMEMBER_ME}
              </Text>

              <Switch
                trackColor={{ false: Colors.SMOKE, true: Colors.SMOKE }}
                thumbColor={isRemember ? Colors.SECONDARY : Colors.DARK}
                ios_backgroundColor={Colors.LIGHT}
                onValueChange={toggleSwitch}
                value={isRemember} />
            </View>
            <TouchableOpacity ref={loginRef}>
              <ArrowRightButton
                titleButton={TITLE.LOGIN}
                imageArrow={ICONS.ARROW_GO}
                backgroundSolidColor={Colors.DARK}
                colorText={Colors.LIGHT}
                onPress={signIn}
                paddingV={10} />
            </TouchableOpacity>


            <ArrowRightButton
              titleButton={TITLE.REGISTER}
              imageArrow={ICONS.DARK_ARROW_GO}
              backgroundSolidColor={Colors.LIGHT}
              colorText={Colors.DARK}
              onPress={signUp}
              paddingV={10}  />

          </View>
          <View style={authen_styles.tagbtnSocial}>
            <TouchableOpacity style={authen_styles.btnSocialLogin}>
              <Image source={ICONS.DARK_FB_LOGO} style={authen_styles.imgSocialLogin} />
            </TouchableOpacity>

            <TouchableOpacity style={authen_styles.btnSocialLogin}>
              <Image source={ICONS.DARK_GG_LOGO} style={authen_styles.imgSocialLogin} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleSwitchForgetPw}>
            <Text style={authen_styles.forgetText}>{TITLE.NEED_HELP}</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
      {bottomNeedHelp()}
    </SafeAreaView>
  )
}

export default Authen