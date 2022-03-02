import React, {useEffect} from 'react'
import Tabs from './src/navigations/Tabs'
import { NavigationContainer } from '@react-navigation/native'
import firebase_app from './src/config/firebase/firebase_config'
const App = () => {

  useEffect(()=>{
    if(firebase_app){
      console.log("Connected")
    }else{
      console.log("Not connect")
    }
  
  },[])

  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>

  )
}

export default App