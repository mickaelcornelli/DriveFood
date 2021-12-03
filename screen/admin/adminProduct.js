import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity, Text, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Feather';
import {getAllProducts} from '../../api/admin';
import {deleteProduct} from '../../api/admin';

const AdminProduct = (props)=> {

    const [products, setProducts] = useState('')

    useEffect(()=>{
    
        getAllProducts(props.user.infos.token)
        .then((res)=>{
          setProducts(res.result)
        })
        
    }, [])

    const goToEditProduct = (id)=>{
        props.navigation.navigate('EditProduct', {id: id})
    }

    const goToDetailProduct = (id)=>{
        props.navigation.navigate('DetailProduct', {id: id})
    }

  return (
    <ImageBackground 
            style={styles.imgBackground } 
            resizeMode='cover' 
            source={require('../../assets/bg3.jpg')}
    >
    <View>
        <ScrollView style={styles.ScrollView}>
            <View style={styles.containerBox}>
                <View style={styles.box}>
                    <View style={styles.column}>
                        <Text style={styles.links}>Gestion des produits</Text>
                    </View>
                </View>
                <View>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{flex: 1},{justifyContent: 'center'}}
                                onPress={() => props.navigation.navigate('AddProduct')}
                                >
                                <Icon2 
                                    size={22} 
                                    name={'add'} 
                                    color={"green"}
                                />
                                <Text> Ajouter un produit</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
                {products.length > 0 &&
                <View>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={{flex: 3}}>Nom</DataTable.Title>
                            <DataTable.Title style={{flex: 1},{justifyContent: 'center'}}>Editer</DataTable.Title>
                            <DataTable.Title style={{flex: 1},{justifyContent: 'center'}}>Supprimer</DataTable.Title>
                        </DataTable.Header>
                        {products.map((product)=>{
                        return (<DataTable.Row key={product.id}>
                            <DataTable.Cell style={{flex: 3}}
                                onPress={() => goToDetailProduct(product.id)}
                            >{product.name}</DataTable.Cell>
                            <DataTable.Cell style={{flex: 1},{justifyContent: 'center'}}
                                onPress={() => goToEditProduct(product.id)}
                            >
                            <Icon3
                                size={18} 
                                name={'edit'} 
                                color={"#23496b"}
                            />
                            </DataTable.Cell>
                            <DataTable.Cell style={{flex: 1},{justifyContent: 'center'}} 
                                onPress={() => deleteProduct(product.id,props.user.infos.token)
                                    .then((res)=>{
                                        console.log("AXIOS DELETE PRODUCT",res);
                                        if(res.status === 200) 
                                        {
                                            props.navigation.navigate('Admin')
                                        }
                                    })
                                }
                            >
                            <Icon
                                size={22} 
                                name={'delete'} 
                                color={'red'}
                            />
                            </DataTable.Cell>
                        </DataTable.Row>)
                        })}
                    </DataTable>
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
    containerBox: {
      flexDirection: 'column',
      flex:1,
      marginBottom: 50,
      marginTop:30
    },
    box: {
      flexDirection: 'row',
      borderColor: '#a3c2fa',
      borderBottomWidth: 1,
      justifyContent: 'center',
      backgroundColor: '#17202a',
    },
    box2: {
        flexDirection: 'row',
        borderColor: '#a3c2fa',
        borderBottomWidth: 1,
        paddingBottom: 15,
        paddingTop:5
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
    sectionTitle1: {
        paddingLeft: 20,
        color: "#6c6b6b"
      },
      sectionTitle2: {
        paddingLeft: 75,
        color: "#6c6b6b"
      },
      sectionTitle3: {
        paddingLeft: 65,
        color: "#6c6b6b"
      },
      sectionTitle4: {
        paddingLeft: 20,
        color: "#6c6b6b"
      },
      inner: {
        width: wp('25%'),
        alignItems: 'center',
        justifyContent: "center",        
      },
      inner2: {
        width: wp('35%'),
        alignItems: 'center',
        justifyContent: "center",
      },
      inner3: {
        width: wp('20%'),
        alignItems: 'center',
        justifyContent: "center",   
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
export default connect(mapStateToProps)(AdminProduct);