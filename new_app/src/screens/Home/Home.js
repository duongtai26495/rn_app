import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Switch,
  ActivityIndicator
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import styles from './_style'
import NAVI_STRING from '../../constants/navigationString'
import axios from 'axios'
import main_styles from '../../assets/styles/style'
import IMAGES from '../../constants/default_image_string'
import ICONS from '../../constants/default_icon_string'
import PARAMS from '../../constants/api_param_string'
import Colors from '../../assets/colors/Color'
import TITLE from '../../constants/title_string'
import ImageVerticalItem from '../../CustomComponents/ImageVerticalItem'
import ImageHorizontalItem from '../../CustomComponents/ImageHorizontalItem'
import ArrowButtonPagination from '../../CustomComponents/ArrowButtonPagination'
const Home = ({ navigation, route }) => {

  const [images, setDataImage] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [page, setPage] = useState(PARAMS.DEFAULT_PAGE)
  const [orientation, setOrientation] = useState(PARAMS.ORIENTATIONS[1].toLowerCase())
  const [selectCategory, setCategory] = useState(PARAMS.CATEGORY)
  const [isLoading, setLoading] = useState(false)
  const [isSafeResult, setSafeResult] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [isNoImage, setNoImage] = useState(false)
  const [isSelectOri, setSelectOri] = useState(false)
  const flatlistRef = useRef();

  useEffect(() => {
    if (route.params?.cateName || route.params?.orienName) {
      setPage(PARAMS.DEFAULT_PAGE)
    }
    getImage(searchKey)

    return (() => {
      setDataImage([]);
    })
  }, [page, orientation, selectCategory, isSafeResult, isFetching])

  const toggleSelectOri = () => setSelectOri(previousState => !previousState)
  const searching = () => {
    setPage(PARAMS.DEFAULT_PAGE)
    getImage(searchKey)
  }


  const getImage = async searchValue => {
    setIsFetching(false);
    setLoading(true)
    await axios.get(PARAMS.BASE_URL, {
      params: {
        key: PARAMS.SECRET_KEY,
        image_type: PARAMS.IMAGE_TYPE,
        pretty: PARAMS.PRETTY,
        orientation: orientation,
        q: searchValue,
        page: page,
        category: selectCategory,
        safesearch: isSafeResult,
        limit: PARAMS.LIMIT_PAGE,
      },
    }).then((response) => {
      const responseImage = response.data.hits
      setDataImage(responseImage)
      setLoading(false)
      console.log(
        "\nq      :   " + searchKey
        + "\npage   :   " + page
        + "\norien  :   " + orientation
        + "\ncate   :   " + selectCategory
        + "\nsafe   :   " + isSafeResult)
    }).catch((err) => {
      console.log("Cannot fetch data. Try again! " + err)
    })


  }
  const goToCategory = () => {
    navigation.navigate(NAVI_STRING.CATEGORY, {
      onGoBack: (cateName) => {
        setCategory(cateName.toLowerCase())
      }
    })
  }

  const selectOrien = ORIENVALUE => {
    setOrientation(ORIENVALUE.toLowerCase())
    setSelectOri(false)
  }


  const renderItem = ({ item }) => {
    if (orientation.toLowerCase() === "vertical") {
      return (
        <TouchableOpacity onPress={() => { navigation.navigate(NAVI_STRING.PHOTOVIEW, { imageId: item.id }) }} >
          <ImageVerticalItem
            imageUrl={item.webformatURL}
            imageLikes={item.likes} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => { navigation.navigate(NAVI_STRING.PHOTOVIEW, { imageId: item.id }) }}>
          <ImageHorizontalItem
            imageUrl={item.webformatURL}
            imageLikes={item.likes} />
        </TouchableOpacity>
      )
    }
  }

  const OrientationComponent = () => {
    if (isSelectOri) {
      return (
        <View style={styles.selectOrienBanner}>
          <TouchableOpacity onPress={() => { selectOrien(PARAMS.ORIENTATIONS[0]) }} style={styles.btnOrienSelect}>
            <Text style={styles.titleOrienSelect}>{PARAMS.ORIENTATIONS[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { selectOrien(PARAMS.ORIENTATIONS[1]) }} style={styles.btnOrienSelect}>
            <Text style={styles.titleOrienSelect}>{PARAMS.ORIENTATIONS[1]}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  const nextPage = () => {
    if (images.length > 0) {
      setPage(page + 1)
      flatlistRef.current.scrollToIndex({ index: 0 });
    } else {
      setNoImage(true)
    }
  }
  const prevPage = () => {

    if (page > 1) {
      setPage(page - 1)
      if (images.length > 0) {
        flatlistRef.current.scrollToIndex({ index: 0 });
        setNoImage(false)
      }
    }
  }

  const OptionTopHeader = () => {
    return (
      <View style={styles.topFunction}>
        {OrientationComponent()}
      </View>
    )
  }

  const PaginationButton = () => {
    return (
      <View style={styles.paginTab}>

        <ArrowButtonPagination
          activeFunc={prevPage}
          pageNumber={page}
          navigateFunc={'prev'} />

        <ArrowButtonPagination
          activeFunc={nextPage}
          pageNumber={page}
          navigateFunc={'next'} />
      </View>
    )
  }

  const onRefresh = () => {
    setIsFetching(true);
    setPage(PARAMS.DEFAULT_PAGE)
  };

  const noImage = () => {
    return (
      <Text style={styles.txtPage}>
        No image found
      </Text>
    )
  }

  return (

    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.searchForm}>
          <TextInput
            returnKeyType={"search"}
            onSubmitEditing={() => { searching() }}
            placeholder={TITLE.SEARCHING}
            style={styles.searchInput}
            placeholderTextColor={Colors.PRIMARY}
            onChangeText={(searchKey) => { setSearchKey(searchKey.toLowerCase()) }} />

          <TouchableOpacity
            style={styles.selectCate}
            onPress={() => { toggleSelectOri() }}>
            <Image style={styles.bgButton} source={IMAGES.IMAGE_GRADIENT[2]} />
            <Text style={styles.txtPage}>{orientation == PARAMS.ORIENTATION ? PARAMS.ORIENTATION : orientation.toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectCate}
            onPress={goToCategory}>
            <Image style={styles.bgButton} source={IMAGES.IMAGE_GRADIENT[3]} />
            <Text style={styles.txtPage}>{selectCategory == PARAMS.CATEGORY ? PARAMS.CATEGORY : selectCategory.toUpperCase()}</Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.button, ...styles.shadowBtn }}
            onPress={() => searching()} >
            <Image style={styles.buttonSearch} source={ICONS.SEARCH} />
            <Image style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0, borderRadius: 10, }} source={require('../../assets/images/gradient_3.jpg')} />
          </TouchableOpacity>
        </View>
        {OptionTopHeader()}
      </View>

      <ActivityIndicator
        size={40}
        animationDuration={1500}
        color={Colors.PRIMARY}
        animating={isLoading ? true : false}
        style={isLoading ? main_styles.indicator : main_styles.stopIndicator}
        hidesWhenStopped={true} />
      <FlatList
        ref={flatlistRef}
        style={styles.flatlist}
        data={images}
        renderItem={renderItem}
        numColumns={2}
        onRefresh={onRefresh}
        refreshing={isFetching}
        keyExtractor={(item, index) => index.toString()}

        ListFooterComponent={
          PaginationButton
        }
        ListEmptyComponent={noImage} />

    </SafeAreaView>
  )
}

export default Home