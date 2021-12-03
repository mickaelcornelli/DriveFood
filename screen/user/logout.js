import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/user/userAction';


const Logout = (props)=>{

    useEffect(()=>{
        removeData();
        props.logoutUser();
    }, [])



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Déconnexion</Text>
        </View>
    );
}

const removeData = async (token) => {
    try {
      await AsyncStorage.removeItem('driveKey');
    } catch (error) {
      console.log(error)
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#17202a',
      paddingTop: hp('30%')
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
      color: "white"
    },
    scrollContainer: {
      width: wp('100%'),
      textAlign: 'center',
    }
  });


mapDispatchToProps = {
    logoutUser
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Logout);