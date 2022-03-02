import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../assets/colors/Color";
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const widthComponent = width/1.3
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.LIGHT,
        justifyContent:'center',
        alignContent:'center'
    },
    logoReg: {
        width: width / 4,
        height: width / 4,
        alignSelf: 'flex-start',
        marginTop: height / 10,
        marginBottom: 30,
    },
    welcomeBanner:{
        width:widthComponent,
        alignSelf:'center'
    },
    registerTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: Colors.WHITE,
        alignSelf: 'flex-start',
        // textShadowColor: Colors.DARK,
        // textShadowOffset: { width: 0.3, height: 0.3 },
        // textShadowRadius: 0.2
    },
    fieldRegisterTab: {
        width: widthComponent,
        alignSelf: 'center',
        marginVertical: 20,
    },
    fieldStyle: {
        paddingHorizontal: 10,
        paddingBottom:10,
        borderRadius: 10,
        color: Colors.WHITE,
        marginVertical: 5,
        width: '100%',
        flex: 1,
    },
    fieldText: {
        fontSize: 20,
        color: Colors.WHITE,
    },
    buttonTag: {
        flexDirection:'row',
        width:widthComponent,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:5,
    },
    btnBg: {
        position: 'absolute',
        width: '100%',
        borderRadius: 10,
        height: '100%',
    },
    btnRegister: {
        flex: 1,
        width: widthComponent,
        alignItems: 'flex-start',
        fontSize:15,
        color:Colors.WHITE,
        alignSelf:'center'
    },

    txtLogin: {
        color: Colors.DARK,
        alignSelf: 'center',
        marginVertical: 10,
    },
    tagbtnSocial: {
        flexDirection:'row',
        alignSelf:'center',
    },
    btnSocialLogin: {
        flexDirection: 'row',
        margin: 10,
        alignSelf:'center',
    },
    imgSocialLogin: {
        width:40,
        height:40,
    },
    tabSwitchRemember:{
        alignItems:'flex-end',
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    labelSwitchRemember:{
        color:Colors.LIGHT,
        padding:5,
    },
    backgroundView:{
        position:'absolute',
        width:'100%',
        height:'100%',
        zIndex:0
    },

    forgetText:{
        alignSelf:'center',
        color:Colors.RED,
        marginVertical:10,
    },
    tabNeedHelp:{
        backgroundColor:Colors.WHITE_TRANSP_4,
        width:'100%',
        height:'100%',
        position:'absolute',
        bottom:0,
        zIndex:10,
    },
    tabNeedHelpFunction:{
        backgroundColor:Colors.WHITE,
        width:'100%',
        padding:30,
        borderTopEndRadius:30,
        borderTopStartRadius:30,
        position:'absolute',
        bottom:0,
        zIndex:11,
    },
    txtNeedHelp:{
        color:Colors.DARK,
        fontSize:17,
        marginVertical:10,
        
    },
    buttonSend:{
        width:'100%',
        borderRadius:10,
        backgroundColor:Colors.PRIMARY,
        padding:10,
        alignItems:'center'
    },
    txtSend:{
        color:Colors.WHITE,
    },
    notifiText:{
        alignSelf:'center',
        color:Colors.RED,
        fontSize:15,
        marginVertical:20,
    }
})

export default styles