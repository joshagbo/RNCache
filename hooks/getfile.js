import React from 'react';
import storage from '@react-native-firebase/storage';

export const useGetFile = async ({name, fileCopyUri}) => {
  const [percentage, setPercentage] = React.useState(0);
  // create bucket storage reference to not yet existing image
  const reference = storage().ref(`RNCacheImages/${name}`);

  try {
    const task = reference.putFile(fileCopyUri);
    task.on('state_changed', snapShot => {
      setPercentage((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
    });
    console.log('File Upload Done!');
  } catch (err) {
    console.log('Upload Error: ', err);
  }

  /*==============
    pick single Image
    ================

    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],//filetype to pick
    });
    console.log(res);
      */
  /*


    ================
    Pick Mutiple Images
==================

    const res = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.images], //type of file to pick
    });
    console.log(res);
    */
  /*




==================
Allow For Univeral Pick
==================

    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
      // allowMultiSelection: true,
    });

    console.log(res[0]);
    // if (res.length) {
    //   const StorageRef = storage().ref('RNCacheImages/', res[0].name);
    //   await StorageRef.putFile(res[0]);
    //   console.log('File Uploaded');
    // }
    */

  return {
    percentage,
  };
};
