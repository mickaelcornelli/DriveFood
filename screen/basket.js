import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Image, Text, View, ScrollView, AsyncStorage } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from "react-redux";
import {saveOrder} from "../api/order"

const Basket = (props)=>{

    const [basket, setBasket] = useState([]) 
    const [cartTotal, setCartTotal] = useState('') 

    useEffect(()=>{
        let asyncStorage = AsyncStorage.getItem("basket")
        .then((res)=>{
            if(res === null)
            {
                console.log("AsyncStorage VIDE")
            }
            else
            {
            setBasket(JSON.parse(res))
            }   
        }) 
        total()   
    }, [basket])

    const refreshBasket = () => {
        let asyncStorage = AsyncStorage.getItem("basket")
        .then((res)=>{
            if(res === null)
            {
                console.log("AsyncStorage VIDE")
            }
            else
            {
                setBasket(JSON.parse(res))
            }     
        })
        total()     
    }

    const goToDetailProduct = (id)=>{
        props.navigation.navigate('DetailProduct', {id: id})
    }

    const total = () => {
        let totalVal = 0
        basket.forEach(element => {
            let totalPriceByRow = Number.parseFloat(element.newPrice).toFixed(2)
            const calculAmount = element.quantityInCart * totalPriceByRow
            totalVal += calculAmount
        })   
        let totalValWithDecimals = totalVal.toFixed(2)
        setCartTotal(totalValWithDecimals.toString())
    }

    const onClickSaveOrder = () => {
		if(props.user.isLogged === true) {
            let totalAmountWithDecimal = parseFloat(cartTotal).toFixed(2)
            let totalAmount = totalAmountWithDecimal
            console.log("TT AMOUNT",totalAmount)
			let data = {
				user_id: props.user.infos.id,
				basket: basket,
                totalAmount: totalAmount
			}
            console.log("dta",data)
			saveOrder(data,props.user.infos.token)
			.then((res)=>{
                if(res.status === 200)
                {
                    console.log("Commande ajoutée. Son ID est le n°:",res.orderId)
                    goToPayment(res.orderId)
                }
            })
			
		}	
	}

    const goToPayment = (id)=> {
        props.navigation.navigate('Payment', {id: id})
      }
    return (
        <ImageBackground 
            style={ styles.imgBackground } 
            resizeMode='cover' 
            source={require('../assets/bg3.jpg')}
        >
        <View> 
        <ScrollView style={styles.ScrollView}>
            <View style={styles.headerContainer}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={()=>{
                            props.navigation.navigate('Home')
                        }}
                    >
                    <Image
                    style={styles.logo}
                    source={require('../assets/img/logo.png')}
                    onPress={()=>{
                        props.navigation.navigate('Home')
                    }}
                    />
                    </TouchableOpacity>
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
            {basket.length === 0 ? <View style={styles.boxHeader}>
                    <Text style={styles.textHeader}>
                        Votre panier est vide
                    </Text>
                </View> 
                : 
                <View>
                    <View style={styles.boxTitle}>
                        <View style={styles.innerPictureTitle}>
                            <Text style={styles.textHeader}>Produit</Text>
                        </View>
                        <View style={styles.innerQteTitle}>
                            <Text style={styles.textHeader}>Qté</Text>                 
                        </View>
                        <View style={styles.innerNewPriceTitle}>
                            <Text style={styles.textHeader}>Prix/u</Text>                 
                        </View>
                        <View style={styles.inner}>
                            <Text style={styles.textHeader}>Suppr</Text>             
                        </View>  
                    </View>

                    {basket.map((showBasket)=>{
                    return <View style={styles.box} key={showBasket.id}>
                        <View style={styles.innerPicture}>
                            <TouchableOpacity
                                onPress={()=>{
                                    goToDetailProduct(showBasket.id)
                                }}
                            >
                                <Image
                                    style={styles.imgHeader}
                                    source={{
                                        uri: showBasket.photo
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.innerQte}>
                            <Text style={styles.text}>
                                {showBasket.quantityInCart}
                            </Text>                 
                        </View>
                        <View style={styles.innerNewPrice}>
                            <Text style={styles.text}>
                                {showBasket.newPrice}
                            </Text>                 
                        </View>
                        <View style={styles.inner}>
                            <TouchableOpacity
                                onPress={()=>{
                                    basket.forEach(element => {
                                        if(element.id === showBasket.id)
                                        {
                                            basket.splice(element,1)
                                            let basketJson = JSON.stringify(basket)
                                            AsyncStorage.setItem("basket",basketJson)
                                            refreshBasket()
                                        }
                                    })
                                }}
                            >
                                <Icon4 
                                    size={30} 
                                    name={'remove'} 
                                    style={styles.icon2}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>   
                    })}
                    <View style={styles.boxPrice}>
                        <View style={styles.innerTotal}>
                            <Text style={styles.text}>Total :</Text>
                        </View>
                        <View style={styles.innerPrice}>
                            {cartTotal === '0' &&
                            refreshBasket()
                            
                            }
                            <Text style={styles.textPrice}>{cartTotal}€</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={(e)=>{
                                onClickSaveOrder()
                            }}
                            style={styles.button}
                            >
                            <Text style={styles.buttonText}>Payer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                }
            </ScrollView>
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    ScrollView: {
        width: wp('100%')
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
        marginTop: 20,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-around'
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
    icon2: {
        color: "red"
    },
    textFromHeader: {
        color:"#a3c2fa",
    },
    textHeader: {
        fontSize: 20
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
    boxTitle: {
        flex:1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom:10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    box: {
        flex:1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    boxPrice: {
        flex:1,
        marginTop: hp("0%"),
        flexDirection: 'row',
        justifyContent:'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
        backgroundColor:"#a3c2fa"
    },
    innerQteTitle: {
        width: wp('15%'),
        alignItems: 'center',
        justifyContent: "center", 
    },
    innerPictureTitle: {
        width: wp('40%'),
        alignItems: 'center',
        justifyContent: "center",
    },
    innerNewPriceTitle: {
        width: wp('25%'),
        alignItems: 'center',
        justifyContent: "center",
    },
    innerQte: {
        width: wp('15%'),
        alignItems: 'center',
        justifyContent: "center", 
        borderRightWidth: 1,       
        borderColor: 'gray'
    },
    innerPicture: {
        width: wp('40%'),
        alignItems: 'center',
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: 'gray'
    },
    inner: {
        width: wp('20%'),
        alignItems: 'center',
        justifyContent: "center",
    },
    innerNewPrice: {
        width: wp('25%'),
        alignItems: 'center',
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: 'gray'
    },
    innerTotal: {
        paddingLeft: 20,
        textAlign: 'left'
    },
    innerPrice: {
        paddingRight: 20,
        textAlign: 'right' 
    },
    imgHeader: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textPrice: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: "#219653",
        borderRadius: 50,
        width: wp('45%'),
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp('5%'),
        marginBottom: wp('10%'),
        marginLeft: wp('27%')
    },
    buttonText: {
        fontSize: 18,
        color: "white"
    },
})

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
  }
  
  export default connect(mapStateToProps)(Basket);