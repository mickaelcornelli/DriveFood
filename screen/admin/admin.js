import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Text, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const Admin = (props)=> {

    return (
        <ImageBackground 
                style={styles.imgBackground } 
                resizeMode='cover' 
                source={require('../../assets/bg3.jpg')}
        >
        <View style={styles.boxHeader } >
            <Text style={styles.title}>Page d'administration</Text>
        </View>
        <View>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.containerBox}>
                  <Text style={styles.text}>Bienvenue sur la page d'administration. Vous pouvez gérer votre drive à l'aide des différents pannels ci-dessous. Chaque catégorie vous permet de piloter le contenu de l'application.
                  </Text>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('AdminUser')}
                      >
                        <View style={styles.column}>
                          <Text style={styles.links}>Gestion des utilisateurs</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('AdminProduct')}
                      >
                        <View style={styles.column}>
                          <Text style={styles.links}>Gestion des produits</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('AdminSection')}
                      >
                        <View style={styles.column}>
                          <Text style={styles.links}>Gestion des rayons</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                </View>  
            </ScrollView>
        </View>
        </ImageBackground>
        
       
    )
}

const styles = StyleSheet.create({
      imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1 
      },
      boxHeader: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingTop: 50,
        paddingBottom: 20
      },
      title: {
        fontSize: 25,
        fontWeight: 'bold'
      },
      ScrollView: {
        width: wp('100%'),
      },
      containerBox: {
        flexDirection: 'column',
        flex:1,
        marginBottom: 100
      },
      box: {
        flexDirection: 'row',
        borderColor: '#a3c2fa',
        borderBottomWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#17202a',
      },
      column: {
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        borderColor: 'gray',
        textAlign: 'center',
      },
      links: {
        fontSize: 20,
        color: '#a3c2fa'
      },
      text: {
        fontSize: 16,
        color: 'black',
        backgroundColor: "yellow",
        padding: 10
      },
      img: {
        width: 70,
        height: 70,
        marginTop:10,
        resizeMode: 'contain'
    },
})

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
  export default connect(mapStateToProps)(Admin);