import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Image, Text, TextInput, View, ScrollView, AsyncStorage, Button } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign'
import {connect} from 'react-redux';
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import {getOneProduct} from '../../api/product';

const DetailProduct = (props)=>{
    
    const [products, setProducts] = useState('')
    const [quantity, setQuantity] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [storage, setStorage] = useState([]) 

    useEffect(()=>{
        let asyncStorage = AsyncStorage.getItem("basket")
        .then((res)=>{
            if(res === null)
            {
                console.log("AsyncStorage VIDE")
            }
            else
            {
            setStorage(JSON.parse(res))
            }     
        })
            getOneProduct(props.navigation.getParam('id'), props.user.infos.token)
            .then((res)=>{
                setProducts(res.result)
            })
      
    }, [])
    
    const addToBasket = ()=>{
       
        if(quantity === ''){
            setErrorMsg("Veuillez saisir une quantitée")
        }
      
        else 
        {
            setErrorMsg("")
            if(storage.length > 0)
            {
                console.log("STORAGE AVEC DU CONTENU",storage)
                
                
                let check = storage.findIndex(b => b.id === products[0].id)
                console.log("check",check)
                if(check === -1)
                {
                    let newBasket = products[0]
                    newBasket.quantityInCart = parseInt(quantity)
                    let newStorage = storage
                    newStorage.push(newBasket)
                    let basketJson = JSON.stringify(newStorage)
                    AsyncStorage.setItem("basket",basketJson)
                    setStorage(newStorage)
                } 
                else
                {
                    let myStorage = storage
                    myStorage[check].quantityInCart += parseInt(quantity)
                    let basketJson = JSON.stringify(myStorage)
                    AsyncStorage.setItem("basket",basketJson)
                    setStorage(myStorage)
                }

            }
            else
            { console.log("STORAGE VIDE",storage)
                let newBasket = products[0]
                newBasket.quantityInCart = parseInt(quantity)
                let myBasket = []
                myBasket.push(newBasket)
                console.log("ELSE -> STORAGE",storage)
                let basketJson = JSON.stringify(myBasket[0])
                AsyncStorage.setItem("basket",basketJson)
                setStorage(myBasket)
            }
            
        }
    }    

return (
    
    <ImageBackground 
      style={ styles.imgBackground } 
      resizeMode='cover' 
      source={require('../../assets/bg3.jpg')}
    >
    <View> 
        {products.length > 0 ?<ScrollView style={styles.ScrollView}>
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
        {isNaN(quantity) && <View>
            <Text style={styles.error}>Veuillez saisir un chiffre !</Text>
        </View>}
        {errorMsg !== '' && <View>
            <Text style={styles.error}>{errorMsg}</Text>
        </View>}
            <View style={styles.box}>
                <View style={styles.col1}>
                    <Text style={styles.text}>{products[0].mark}</Text>
                    {products[0].promotion > 0 ?
                    <Text style={styles.promo}>-{products[0].promotion}%</Text>
                    : <Text></Text>
                    }
                    <Text style={styles.textPrice}>{products[0].price}€</Text>
                </View>
                <View style={styles.col2}> 
                    <Image
                        style={styles.img}
                        source={{
                            uri: products[0].photo
                        }}
                    />
                </View>
                <View style={styles.col3}>
                    <TextInput 
                        style={styles.quantity}
                        placeholder="Quantitée"
                        keyboardType = "numeric"
                        value={quantity}
                        onChangeText={(inputText)=>{
                            setQuantity(inputText)
                        }}
                    />
                    <TouchableOpacity
                        onPress={(e)=>{
                           addToBasket()
                        }}
                    >
                        <View>
                            <Text style={styles.button}>Ajouter</Text>
                        </View> 
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.col}>
                <Text style={styles.titleBody}>Description :</Text>
                <Text style={styles.text}>{products[0].description}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.titleBody}>Ingrédients :</Text>
                <Text style={styles.text}>{products[0].ingredients}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.titleBody}>Conservation :</Text>
                <Text style={styles.text}>{products[0].conservation}</Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.titleBody}>Fabriquant :</Text>
                <Text style={styles.text}>{products[0].provider}</Text>
            </View> 
                
            
        </ScrollView>
        :<Text>Une erreur est survenue</Text>}
    
    </View>
    </ImageBackground>

)

}
    const styles = StyleSheet.create({
        ScrollView: {
            width: wp('100%')
        },
        imgBackground: {
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
        box: {
            marginTop: 15,
            paddingLeft: 5,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: 'gray',
            alignItems: 'center',
        },
        col1: {
            width: wp('25%'),
            flexDirection: 'column',
            alignItems: 'center',
        },
        col2: {
            width: wp('45%'),
            flexDirection: 'column',
            alignItems: 'center'
        },
        col3: {
            width: wp('30%'),
            alignItems: 'center',
        },
        col: {
            padding: 10,
            borderBottomWidth: 1,
            borderColor: 'gray',
            alignItems: 'center'
        },
        img: {
            flex: 1,
            aspectRatio: 1.5, 
            resizeMode: 'contain'
        },
        text: {
            fontSize: 18,
        },
        textPrice: {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 10
        },
        titleBody: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#191970'
        },
        button: {
            height: 30,
            width: 80,
            paddingTop: 3,
            backgroundColor: "#219653",
            borderRadius: 50,
            textAlign: 'center',
            color: '#fff',
            fontSize: 15
        },
        promo: {
            marginTop: 10,
            padding: 5,
            borderWidth: 1,
            borderRadius: hp('50%'),
            borderColor: 'white',
            backgroundColor: 'red',
            color: 'white',
            fontWeight: 'bold'
        },
        quantity: {
            marginTop: 15,
            marginBottom: 10,
            padding: 5,
            borderWidth: 1,
            borderColor: "gray",
        },
        error: {
            color: 'red',
            textAlign: 'center',
            fontSize: 20
        }
    })

mapStateToProps = (store)=>{
    return {
        user: store.user,
    }
}

export default connect(mapStateToProps)(DetailProduct);

