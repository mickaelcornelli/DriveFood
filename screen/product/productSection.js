import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {getSectionProducts} from '../../api/product';
import {connect} from 'react-redux';
import {Appbar} from 'react-native-paper'
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';

const ProductSection = (props)=>{

  const [products, setProducts] = useState('')

  useEffect(()=>{
    
    getSectionProducts(props.navigation.getParam('id'), props.user.infos.token)
    .then((res)=>{
      setProducts(res.result)
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
            {products.length > 0 ? <ScrollView style={styles.ScrollView}>
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
                        Les produits du rayon :
                    </Text>
                </View>
                {products.map((product)=>{
                return (<View style={styles.box} key={product.id}>
                    <View style={styles.inner}>
                      <TouchableOpacity
                        onPress={()=>{
                          goToDetailProduct(product.id)
                        }}
                      >
                        <Image
                          style={styles.imgHeader}
                          source={{
                            uri: product.photo
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.inner2}>
                        <Text style={styles.text}>
                            {product.name}
                        </Text>
                    </View>
                    <View style={styles.inner3}>
                        <Text style={styles.text}>
                            {product.price}€
                        </Text>                 
                    </View>
                </View>)
              })}
            </ScrollView> : 
            <View style={styles.boxNoData}>
                <Text style={styles.text}>
                    Aucun produits disponibles !
                </Text>                 
            </View>
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
        height:80
      },
      container: {
        flex: 1,
        marginTop:20,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        marginBottom: hp('0%'),
        paddingTop: hp('3%'),
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
      inner: {
        width: wp('30%'),
        alignItems: 'center',
        justifyContent: "center",        
        borderRightWidth: 1,
        borderColor: 'gray'
      },
      inner2: {
        width: wp('40%'),
        alignItems: 'center',
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: 'gray'
      },
      inner3: {
        width: wp('20%'),
        alignItems: 'center',
        justifyContent: "center",
      },
      imgHeader: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain'
      },
      innerText: {
        color: 'black',
        fontWeight: "bold"
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
        fontSize: 18
      },
      boxNoData: {
        marginTop: 50,
      }

    })
mapDispatchToProps = {
    
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductSection);