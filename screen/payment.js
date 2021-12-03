import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, ImageBackground, Image, Text, TextInput, View, Button, Alert, ScrollView, AsyncStorage } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import {config} from '../config'
import Icon5 from 'react-native-vector-icons/SimpleLineIcons'
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native'
import {StripeProvider} from '@stripe/stripe-react-native'
import {userPersonnalInformations} from '../api/user'
import {payment} from '../api/order'
import {updateStatus} from '../api/order'

const Payment = (props)=>{

    const [email, setEmail] = useState()
    const [cardDetails, setCardDetails] = useState('')
    const { confirmPayment, loading } = useConfirmPayment()
    const API_URL = config.api_url

    useEffect(() => {
        userPersonnalInformations(props.user.infos.id,props.user.infos.token)
        .then((response)=>{
           setEmail(response.result[0].email)
        })
    }, [])

    const fetchPaymentIntentClientSecret = async () => {
        let data = {
            orderId: props.navigation.getParam('id'),
            email: email
        }
        const response = await payment(data,props.user.infos.token)  
        const clientSecret = response
        
        return {clientSecret}
    }

    const handlePayPress = async () => {

        if (!cardDetails?.complete ) {
        Alert.alert("Veuillez compléter vos informations de carte bancaire")
        return;
        }
        const billingDetails = {
        email: email,
        }
        
        try {
        const { clientSecret} = await fetchPaymentIntentClientSecret()
            
            if (!clientSecret.client_secret) 
            {
                console.log("Unable to process payment")
            } 
            else 
            {
                
                Alert.alert(
                    '',
                    'Paiment effectué !',
                    [                    
                    {text: 'OK', onPress: () => {
                        let data = {
                            orderId: props.navigation.getParam('id'),
                        }
                        updateStatus(data,props.user.infos.token)
                        .then((response)=>{
                            if(response.status === 200)
                            {
                                clearAsyncStorage()
                                props.navigation.navigate('Account')
                            }
                        })
                    }},
                    ],
                    {cancelable: false},
                )
                /*
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    type: "Card",
                    billingDetails: billingDetails,
                })
                console.log("payment intent response",test)
                /*if (error) 
                {
                    alert(`Payment Confirmation Error ${error.message}`)
                } 
                else if (paymentIntent) 
                {
                    alert("Payment Successful");
                    console.log("Payment successful ", paymentIntent)
                }*/
            }
        } catch (e) {
        console.log("catch handlePayPress",e);
        }
    }


    const clearAsyncStorage = async() => {
        AsyncStorage.clear()
        console.log("--------------- Storage Clear ---------------------")
    }

    return (
    
        <ImageBackground 
            style={ styles.imgBackground } 
            resizeMode='cover' 
            source={require('../assets/bg3.jpg')}
        >
        <View> 
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
                        Paiement
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
            <StripeProvider publishableKey="pk_test_51JMs1lFtc5OHVwRylMTkPstIyR6EpxlrJTKWFAieNbi7kWxqotTpHriv3HNrv6sZxu2WCD8C8ko0e1LrEIycp3rf00y9Wo9sBa">
                <View style={styles.cardContainer}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder= "E-mail"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(inputText)=>{
                            setEmail(inputText)
                        }}
                        style={styles.input}
                    />
                    <CardField
                        postalCodeEnabled={false}
                        placeholder={{
                            number: "4242 4242 4242 4242",
                        }}
                        cardStyle={styles.card}
                        style={styles.cardContainer}
                        onCardChange={cardDetails => {
                            setCardDetails(cardDetails);
                        }}
                    />    
                    <Button onPress={handlePayPress} title="Payer" disabled={loading} />
                </View>
            </StripeProvider>
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
    headerContainer: {
        backgroundColor: '#17202a',
        height:80
    },
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:5,
        paddingRight: 10,
    },
    logo: {
        width:50,
        height:53,
    },
    title: {
        color:'#a3c2fa',
        fontSize: 20
    },
    icon: {
        color:'#a3c2fa',
    },
    textFromHeader: {
        color:"#a3c2fa",
    },
    textHeader: {
        fontSize: 20
    },
    card: {
        backgroundColor: "#dcdcdc",
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
        padding: 20
    },
    input: {
        backgroundColor: "#dcdcdc",
        borderColor: "#000000",
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10
    },
})

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps)(Payment);