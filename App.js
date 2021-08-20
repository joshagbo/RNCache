import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  useColorScheme,
  LogBox,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import {Appbar} from './components/appbar';
import {ButtonAdd} from './components/buttonAdd';
import firestore from '@react-native-firebase/firestore';
// import {ImageComponent} from './components/images';

/*
===============
Disable App Loggings
*/
LogBox.ignoreAllLogs();
/*
===============*/

// const imagesView = file => console.log(file.items.path);
export const ImageComponent = file => {
  return (
    <View>
      <Image
        source={{uri: file.item.data().url}}
        style={{width: '100%', height: 200}}
      />
    </View>
  );
};

const App = () => {
  /*
  =======================
  STATE
  =======================
  */

  const [images, setImages] = React.useState([]);

  /*
  ===================
  FIRESTORE
  ===================
  */
  const imageCollection = firestore().collection('Images');

  React.useEffect(() => {
    const Subscriber = firestore()
      .collection('Images')
      .onSnapshot(docSnapshot => {
        const data = docSnapshot.docs;
        setImages(data);
      });
    return () => Subscriber();
  }, []);

  const background = useColorScheme();
  const {height, width} = Dimensions.get('screen');
  // console.log(images[0].data().url);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      }}>
      <StatusBar
        barStyle={background === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Appbar title="RNCache" />
      <ButtonAdd width={width} />
      <View>
        {/* <Image source={{uri: images.length ? images[0].data().url : null}} /> */}
        <Text>Images</Text>
      </View>
      {images ? (
        <FlatList
          data={images}
          renderItem={ImageComponent}
          keyExtractor={(item, i) => i}
          extraData={images}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default App;
