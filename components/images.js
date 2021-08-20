import React from 'react';
import {Image} from 'react-native';

export const ImageComponent = file => {
  return <Image source={{uri: file.item.data().url}} style={{width: '100%'}} />;
};
