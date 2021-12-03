import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, ImageBackground, ScrollView, Date} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { DataTable } from 'react-native-paper';
import {getAllOrder} from '../../api/order'

const AllOrders = (props)=>{

const [orders, setOrders] = useState('')

useEffect(()=>{
    
    getAllOrder(props.user.infos.id,props.user.infos.token)
    .then((res)=>{
      setOrders(res.result)
    })
    
}, [])

    const convertDateFormat = (sqlDate) => {
            let sqlDateArr1 = sqlDate.split("-")
            const newDate = `${sqlDateArr1[2].substring(0, 2)}/${sqlDateArr1[1]}/${sqlDateArr1[0]}`
            return newDate
    }

    const goToOrderDetail = (id)=>{
        props.navigation.navigate('Order', {id: id})
    }

    return(
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
                            Vos factures
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
                                    props.navigation.navigate('Account')         
                                }}
                            >
                            <Text style={styles.links}>Votre dernière commande</Text>
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
                    {orders.length > 0 ?
                    <View style={styles.box2}>
                        <Text style={styles.h1}>Toutes vos commandes</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title style={{flex: 2}}>N° commande</DataTable.Title>
                                <DataTable.Title style={{flex: 3}}>Date</DataTable.Title>
                                <DataTable.Title style={{flex: 2}}>Montant</DataTable.Title>
                                <DataTable.Title style={{flex: 2}}>Status</DataTable.Title>
                            </DataTable.Header>
                            {orders.map((order)=>{
                                return (<DataTable.Row key={order.id} 
                                    onPress={() => goToOrderDetail(order.id)}
                                >
                                    <DataTable.Cell style={{flex: 2}}>{order.id}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 3}}>{convertDateFormat(order.creationTimestamp)}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}}>{order.totalAmount}€</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}}>
                                    {order.status === 'Non payé' ?
                                        <Text style={{ color: "red" }}>{order.status}</Text>
                                    :
                                        <Text style={{ color: "green" }}>{order.status}</Text>
                                    }
                                    </DataTable.Cell>
                                </DataTable.Row>)
                            })}
                        </DataTable>
                    </View>
                    :
                    <View style={styles.box2}>
                        <Text style={styles.noCommand}>Vous n'avez fait aucune commande</Text>
                    </View>
                    }
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
        marginTop:20,
		alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:10,
        paddingRight: 10
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
    textHeader: {
        color: "#17202a",
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 25
    },
    imgHeader: {
        width: wp('100%'),
        height: hp('20%'),
    },
    containerBox: {
        flexDirection: 'column',
        flex:1
    },
    box: {
        flexDirection: 'row',
        height: 60,
        borderColor: '#a3c2fa',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    noCommand: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
        color: 'red'
    },

})

 
mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps)(AllOrders);   