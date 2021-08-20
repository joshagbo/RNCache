import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import storage, {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';

export const ButtonAdd = ({width}) => {
  const [percentage, setPercentage] = React.useState(null);
  const {addButton, Button, buttonText} = styles;

  /*
  ====================
  Upload File To firebase
  ====================
  */

  const uploadFile = async ({name, fileCopyUri}) => {
    // create bucket storage reference to not yet existing image
    const reference = storage().ref(`RNCacheImages/${name}`);
    const collectionRef = firestore().collection('Images');
    const task = reference.putFile(fileCopyUri);

    task.on('state_changed', snapShot => {
      //get percentage transferred in realtime
      let transferPercentage = Math.floor(
        (snapShot.bytesTransferred / snapShot.totalBytes) * 100,
      );
      setPercentage(transferPercentage);
    });

    task.then(async () => {
      const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
      const url = await reference.getDownloadURL();
      console.log(url);
      await collectionRef.add({
        url,
        createdAt: timeStamp,
      });
    });
  };
  //   try {
  //     const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
  //     const url = await reference.getDownloadURL();
  //     console.log(url);
  //     await collectionRef.add({
  //       url,
  //       createdAt: timeStamp,
  //     });
  //   } catch (e) {
  //     console.log('FireStore Error: ', e.message);
  //   }
  // };

  if (percentage == 100) {
    setTimeout(() => setPercentage(null), 6000);
  }
  // console.log('Percentage Uploaded: ', percentage + '%');
  return (
    <View style={addButton}>
      <TouchableOpacity
        onPress={async () => {
          // path to existing file on filesystem
          try {
            const pathToFile = await DocumentPicker.pickSingle({
              type: [DocumentPicker.types.allFiles],
              copyTo: 'cachesDirectory',
            });

            const {fileCopyUri, name} = pathToFile;

            await uploadFile({fileCopyUri, name});
          } catch (err) {
            console.log('Getter Error: ', err);
          }
        }}>
        <View style={{...Button, width}}>
          <Text style={buttonText}>+</Text>
        </View>

        {percentage ? (
          <View
            style={{
              maxWidth: `${percentage}%`,
              height: 20,
              backgroundColor: 'yellow',
            }}
          />
        ) : null}
        {percentage ? (
          <Text
            style={{
              color: '#f9f8fa',
              fontSize: 16,
              fontFamily: 'Quicksand',
              textAlign: 'center',
            }}>
            {percentage == 100 ? 'Upload Succeeded' : 'Uploading...'}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    width: '100%',
  },
  Button: {
    width: '100%',
    padding: 16,

    backgroundColor: '#3b5998',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
});
