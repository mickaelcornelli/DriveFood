import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import { DataTable } from 'react-native-paper';
import {getOneOrder} from '../../api/order'
import {getOrderDetail} from '../../api/order'
import {getAllProduct} from '../../api/product'

const Order = (props)=>{

    const [order, setOrder] = useState('')
    const [orderDetail, setOrderDetail] = useState('')
    const [productNameArray, setProductNameArray] = useState('')
    const [arrayLoad,setArrayLoad] = useState(false)

    useEffect(() => {
       
        getOneOrder(props.navigation.getParam('id'),props.user.infos.token)
        .then((response) => {
            setOrder(response.result)
            console.log(order.length,"order")
        })
        getOrderDetail(props.navigation.getParam('id'),props.user.infos.token)
        .then((response) => {
            setOrderDetail(response.result)
        })
        getAllProduct(props.user.infos.token)
        .then((response) => {
            setProductNameArray([...productNameArray, response.result]); 
            setArrayLoad(true) 
        })

    }, [])

    const loadDataTable = () => {
        
        if(props.navigation.getParam('id'))
        {
            return(
                <View>
                    <Text style={styles.bill}>Commande n° {props.navigation.getParam('id')}</Text>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{flex: 5}}>Produit</DataTable.Title>
                            <DataTable.Title style={{flex: 1}}>Qté</DataTable.Title>
                            <DataTable.Title style={{flex: 1}}>Total</DataTable.Title>
                        </DataTable.Header>
                    </DataTable>
                    {orderDetail.length > 0 &&
                    <DataTable>
                        {orderDetail.map((details)=>{
                        return (<DataTable.Row key={details.id}>
                            <DataTable.Cell style={{flex: 5}}>{productNameArray[0][details.product_id].name}</DataTable.Cell>
                            <DataTable.Cell style={{flex: 1}}>{details.quantity}</DataTable.Cell>
                            <DataTable.Cell style={{flex: 1}}>{details.total} €</DataTable.Cell>
                        </DataTable.Row>)
                        })}
                        {order.length > 0 &&
                        <DataTable.Row>
                            <DataTable.Cell style={{flex: 1}}>
                                <Text style={styles.total}>TOTAL :</Text>
                            </DataTable.Cell>
                            
                            <DataTable.Cell style={{flex: 1.5}}>
                                <Text style={styles.total}>{order[0].totalAmount} €</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{flex: 1.5}}>Status : 
                            {order[0].status === 'Non payé' ?
                                <Text style={{ color: "red" }}> {order[0].status}</Text>
                            :
                                <Text style={{ color: "green" }}> {order[0].status}</Text>
                            }
                            </DataTable.Cell>
                        </DataTable.Row>
                        }
                    </DataTable>
                    }
                </View>
            )
        }

    }

    return (
        <ImageBackground 
            style={ styles.imgBackground } 
            resizeMode='cover' 
            source={require('../../assets/bg3.jpg')}
        >
        <View>
            <ScrollView style={styles.ScrollView}>
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
                                    props.navigation.navigate('Logout')
                                }}
                            >
                                <Icon2 
                                    size={30} 
                                    name={'logout'} 
                                    style={styles.icon}
                                />
                                <Text style={styles.logout}
                                >
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.boxHeader}>
                    <Text style={styles.textHeader}>
                            Rappel Covid
                        </Text>
                        <Image
                            style={styles.imgHeader}
                            source={{
                                uri:'https://static.expanscience.com/sites/default/files/uploads/banniere-coronavirus-750.jpg'
                            }}
                        />
                </View>
                <View style={styles.containerBox}>
                    <View style={styles.box}>
                        <View style={styles.column}>
                            <TouchableOpacity
                                onPress={()=>{
                                    props.navigation.navigate('AllOrders')     
                                }}
                            >
                            <Text style={styles.links}>Historique de toutes vos commandes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.column}>
                            <TouchableOpacity
                                onPress={()=>{
                                    props.navigation.navigate('AccountInformations')         
                                }}
                            >
                            <Text style={styles.links}>Vos informations personnelles</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.column}>
                            <TouchableOpacity
                                onPress={()=>{
                                    props.navigation.navigate('CommunicationsPreferences')         
                                }}
                            >
                            <Text style={styles.links}>Vos préférences de communications</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {arrayLoad && loadDataTable()}
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
    ScrollView: {
        width: wp('100%'),
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
    h1: {
        fontSize: 25,
        textAlign: 'center',
        paddingTop: hp('1%'),
        paddingBottom: hp('1%')
    },
    bill: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
        color: 'black',
        backgroundColor: 'yellow'
    },
	icon: {
        color:'#a3c2fa',
    },
    logout: {
        color:"#a3c2fa",
    },
    boxHeader: {
        borderBottomWidth: 3,
        borderColor: '#fff',
        paddingTop: hp('3%'),
        paddingBottom: hp('3%')
    },
    imgHeader: {
        width: wp('100%'),
        height: hp('20%'),
    },
    textHeader: {
        color: "#17202a",
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 25
    },
    containerBox: {
        flexDirection: 'column',
        flex:1
    },
    box: {
        height: 60,
        flexDirection: 'row',
        borderColor: '#a3c2fa',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#17202a',
    },
    box2: {
        flexDirection: 'column'
    },
    column: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        borderColor: 'gray',
        textAlign: 'center',
    },
    links: {
        color: '#a3c2fa',
        fontSize: 19
    },
    total: {
        fontWeight: 'bold',
        fontSize: 18
    }

  })

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps)(Order);