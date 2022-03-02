import { StyleSheet } from 'react-native'
import Colors from '../colors/Color'
const style = StyleSheet.create({
    containerBottomBar:{
        position:'absolute',
        bottom:25,
        left:20,
        right:20,
        elevation:0,
        backgroundColor:Colors.PRIMARY,
        borderRadius:20,
        height:90,
    },
    shadow:{
        shadowColor:Colors.DARK,
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.5,
        shadowRadius:10,
        elevation:5
    },
    indicator: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
      },
      stopIndicator: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
      },
})

export default style