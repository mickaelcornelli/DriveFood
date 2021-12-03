import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { DataTable } from 'react-native-paper';
import {connect} from 'react-redux';
import {getLastOrder} from '../../api/order'

const Account = (props)=>{

    const [lastOrder, setLastOrder] = useState('');

    useEffect(()=>{
        
        getLastOrder(props.user.infos.id,props.user.infos.token)
        .then((res)=>{
            setLastOrder(res.result)
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
                        {lastOrder.length > 0 ?
                        <View style={styles.box2}>
                            <Text style={styles.h1}>Votre dernière commande</Text>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title style={{flex: 2}}>N° commande</DataTable.Title>
                                    <DataTable.Title style={{flex: 3}}>Date</DataTable.Title>
                                    <DataTable.Title style={{flex: 2}}>Montant</DataTable.Title>
                                    <DataTable.Title style={{flex: 2}}>Status</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row
                                    onPress={() => goToOrderDetail(lastOrder[0].id)}
                                >
                                    <DataTable.Cell style={{flex: 2}}>{lastOrder[0].id}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 3}}>{convertDateFormat(lastOrder[0].creationTimestamp)}</DataTable.Cell>
                                    <DataTable.Cell style={{flex: 2}}>{lastOrder[0].totalAmount}€</DataTable.Cell>
                                    <DataTable.Cell style={{flex:2}}>
                                        {lastOrder[0].status === 'Non payé' ?
                                        <Text style={{ color: "red" }}>{lastOrder[0].status}</Text>
                                        :
                                        <Text style={{ color: "green" }}>{lastOrder[0].status}</Text>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
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
    noCommand: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
        color: 'red'
    },
	icon: {
        color:'#a3c2fa',
    },
    imgHeader: {
        width: wp('100%'),
        height: hp('20%'),
    },
    logout: {
        color:"#a3c2fa",
    },
    boxHeader: {
        paddingTop: hp('3%'),
        paddingBottom: hp('3%')
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

})
 
mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps)(Account);                        