import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../assets/colors/Color";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const _style = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: Colors.LIGHT,
    },
    title: {
        height: 50,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.SECONDARY,
        justifyContent: 'center',
    },
    txtTitle: {
        position: 'absolute',
        color: Colors.LIGHT,
        fontWeight: 'bold',
        fontSize: 20,
        zIndex: 1,
    },
    imgTitle: {
        width: '100%',
        height: 50,
    },
    layerBlack: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
    },
    itemBtn: {
        width: width / 2.3,
        height: height / 2,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 15,
        flex: 1,
        margin: 3,
        shadowColor: Colors.RED,
        elevation: 10,
    },
    itemBg: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    itemTitle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignSelf: 'center',
        color: Colors.LIGHT,
        fontWeight: 'bold',
        fontSize: 15,
        borderRadius: 15,
        zIndex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    rowItem: {
        flexDirection: 'row',
        width: '100%',
    },
    columnItem: {
        padding: 10,

    },
    flatlist: {
        width,
        height: '100%',
        flex: 1,
        padding: 5,

    },

})

export default _style