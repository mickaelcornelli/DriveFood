import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {getAllPromotion} from '../../api/promotion';
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';


const Promotions = (props)=>{
  
  const [productsInPromotion, setProductsInPromotion] = useState('')

  useEffect(()=>{
    
    getAllPromotion(props.user.infos.token)
    .then((response)=>{
      setProductsInPromotion(response.result)
    })

}, [])

const goToDetailProduct = (id)=>{
  props.navigation.navigate('DetailProduct', {id: id})
}

  return(
    <ImageBackground 
        style={ styles.imgBackground } 
        resizeMode='cover' 
        source={require('../../assets/bg3.jpg')}
    >
    <View>
      {productsInPromotion.length > 0 ?<ScrollView style={styles.ScrollView}>
        <View style={styles.headerContainer}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../../assets/img/logo.png')}
            />
            <Text style={styles.title}
            >
              Bienvenue dans votre Drive
            </Text>            
            <View>
              <TouchableOpacity
                onPress={()=>{
                  props.navigation.navigate('Basket')
                }}
              >
                <Icon5 
                  size={30} 
                  name={'basket'} 
                  style={styles.icon}
                />
                <Text style={styles.textFromHeader}>
                  Panier
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
            <View style={styles.boxHeader}>
                <Text style={styles.textHeader}>
                    Les promotions du moment :
                </Text>
            </View>
            {productsInPromotion.map((products)=>{
            return <View style={styles.box} key={products.id}>
                <View style={styles.inner3}>
                  <TouchableOpacity
                      onPress={()=>{
                        goToDetailProduct(products.id)
                      }}
                  >

                    <Image
                    style={styles.imgHeader}
                    source={{
                          uri: products.photo
                        }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inner3}>
                    <Text style={styles.text}>
                      {products.name}
                    </Text>
                </View>
                <View style={styles.inner1}>
                  <Text style={styles.promo}>
                      -{products.promotion}%
                  </Text>   
                  <Text style={styles.text}>
                      {products.price}€
                  </Text>                 
                </View>
            </View>})
           }
        </ScrollView> : <Text>Il n'y a aucun produits en promotions</Text>
      }
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

ScrollView: {
    width: wp('100%'),
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
  },
  headerContainer: {
    backgroundColor: '#17202a',
    height:90
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft:5,
    paddingRight: 5,
  },
  logo: {
    width:50,
    height:53,
  },
  title: {
    color:'#a3c2fa',
    fontSize: 18
  },
  icon: {
    color:'#a3c2fa',
  },
  textFromHeader: {
    color:"#a3c2fa",
  },
  boxHeader: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-around',
    borderColor: 'gray',
    paddingTop: hp('1%'),
    borderBottomWidth: 3,
  },
  box: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  inner1: {
    flex:1,
    alignItems: 'center',
    justifyContent: "center",        
    borderColor: 'gray'
  },
  
  inner3: {
    flex:2,
    alignItems: 'center',
    justifyContent: "center",   
    borderRightWidth: 1,
    borderColor: 'gray'
  },
  promo: {
    width: wp('15%'),
    textAlign: 'center',
    marginTop: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold'
  },
  imgHeader: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },

  textHeader: {
    color: "#17202a",
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 25
  },
  text: {
    color: "black",
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5
  },
  quantity: {
    marginTop: 10,
    borderColor: "gray",
    borderWidth: 1
  }

})

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps)(Promotions);