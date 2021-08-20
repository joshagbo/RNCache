import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Appbar = ({title}) => {
  const {Appbar, appBarTitle} = styles;
  return (
    <View style={Appbar}>
      <Text style={appBarTitle}>{title}</Text>
    </View>
  );
};

/*
==================
STYLESHEET
==================
*/

const styles = StyleSheet.create({
  Appbar: {
    height: 63,
    backgroundColor: '#f9f8fa',
    display: 'flex',
    justifyContent: 'center',
  },
  appBarTitle: {
    fontFamily: 'Open Sans',
    fontSize: 24,
    fontWeight: '800',
    paddingLeft: 20,
    color: '#444',
  },
});
