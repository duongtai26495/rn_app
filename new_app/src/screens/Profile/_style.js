import { StyleSheet, Dimensions } from "react-native";
import Color from "../../assets/colors/Color";
import Colors from "../../assets/colors/Color";

const width = Dimensions.get('window').width
const widthComponent = width / 1.1
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    userProfileImage: {
        width:widthComponent-12,
        height: width / 2.1,
        zIndex: 10,
        alignSelf: 'center',
        borderRadius: 10,
    },
    tabImageProfile: {
        elevation: 5,
        shadowColor: Colors.DARK,
        padding: 5,
        backgroundColor: Colors.LIGHT,
        width: widthComponent,
        height: width / 2,
        marginBottom: 5,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 15,

    },
    msgNotLogin: {
        fontWeight: 'bold',
        color: Colors.DARK,
        alignSelf: 'center',
        fontSize: 20,
        marginVertical: 20,
    },
    btnBg: {
        position: 'absolute',
        width: '100%',
        borderRadius: 10,
        height: '100%',
    },
    titleButton: {
        padding: 10,
        color: Colors.BLACK,
        fontWeight: 'bold'
    },
    btnProfile: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
        elevation: 7,
        shadowColor: Colors.DARK,
        backgroundColor: Colors.LIGHT,
        borderRadius: 15,
    },
    btnCardProfile: {
        alignSelf: 'center',
        width: widthComponent,
        backgroundColor:Colors.DARK
    },
    fullNameProfile: {
        color: Colors.DARK,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        flex: 1,
    },
    btnSignOut: {
        flex: 1,
        width: widthComponent,
        alignItems: 'center',
        alignSelf:'center',
        marginVertical: 5,
        padding:5,
        elevation: 3,
        shadowColor: Colors.DARK,
        backgroundColor: Colors.LIGHT,
        borderRadius: 15,
    },
    backgroundView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0
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
    textProfile: {
        color: Colors.DARK,
        fontSize: 15,
        marginVertical: 5,
        fontWeight: 'bold',
        flex: 1,      
    },
    infoCard: {
        flex:1,
        marginVertical: 5,
        width: widthComponent,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.WHITE_TRANSP_6,
        borderRadius: 15,
        padding:15,
    },
    inputNewName: {
        color: Colors.PRIMARY,
        flex: 1,
        marginVertical: 5,
        backgroundColor: Colors.WHITE,
        padding: 5,
        borderRadius: 5,
    },
    btnChangeProfile: {
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        justifyContent: 'center',
        marginVertical: 5,
    },
    bottomCardView: {
        width: '100%',
        position: 'absolute',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        bottom: 0,
        zIndex: 15,
        backgroundColor: Colors.LIGHT,
        padding: 20,
        justifyContent: 'center',
        elevation: 10,
        shadowColor: Colors.DARK
    },
    bottomCardTitle: {
        color: Colors.DARK,
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 10,
    },
    bottomCardSubTitle: {
        color: Colors.DARK,
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 10,
    },
    bottomBtnCard: {
        backgroundColor: Color.PRIMARY,
        width: '100%',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        shadowColor: Color.RED,
        marginBottom: 10,
    },
    bottomTxtCard: {
        color: Color.LIGHT,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    blurFullLayer: {
        backgroundColor: Colors.WHITE_TRANSP_8,
        position: 'absolute',
        width: '100%',
        height: '100%',
        bottom: 0,
        zIndex: 10,
    },
    previewSelectedImage: {
        width: widthComponent,
        height: width / 2,
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 10
    },
    switchDarkMode: {
        alignSelf: 'center'
    }
})

export default styles