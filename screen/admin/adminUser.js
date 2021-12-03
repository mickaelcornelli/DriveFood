import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity, Text, View } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {getAllUsers} from '../../api/admin';
import {deleteUser} from '../../api/admin';

const AdminUser = (props)=> {

    const [users, setUsers] = useState('')

    useEffect(()=>{
    
    getAllUsers(props.user.infos.token)
    .then((res)=>{
      setUsers(res.result)
    })
    
    }, [])


const goToEditUser = (id)=>{
    props.navigation.navigate('EditUser', {id: id})
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
                        <Text style={styles.links}>Gestion des utilisateurs</Text>
                    </View>
                </View>
                <View>
                  <DataTable>
                    <DataTable.Row>
                      <DataTable.Cell style={{flex: 1},{justifyContent: 'center'}}
                        onPress={() => props.navigation.navigate('AddUser')}
                      >
                        <Icon 
                          size={22} 
                          name={'adduser'} 
                          color={"green"}
                        />
                        <Text> Ajouter un utilisateur</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  </DataTable>
                </View>
              
                {users.length > 0 &&
                  <View>
                    <DataTable>
                      <DataTable.Header>
                            <DataTable.Title style={{flex: 3}}>Email</DataTable.Title>
                            <DataTable.Title style={{flex: 1}}>Rôle</DataTable.Title>
                            <DataTable.Title style={{flex: 1},{justifyContent: 'center'}}>Editer</DataTable.Title>
                            <DataTable.Title style={{flex: 1},{justifyContent: 'center'}}>Supprimer</DataTable.Title>
                      </DataTable.Header>
                      {users.map((user)=>{
                        return (<DataTable.Row key={user.id}>
                            <DataTable.Cell style={{flex: 3}}>{user.email}</DataTable.Cell>
                            <DataTable.Cell style={{flex: 1}}>{user.role}</DataTable.Cell>
                            <DataTable.Cell style={{flex: 1},{justifyContent: 'center'}}
                              onPress={() => goToEditUser(user.id)}
                            >
                              <Icon5 
                                size={18} 
                                name={'user-edit'} 
                                color={"#23496b"}
                              />
                            </DataTable.Cell>
                            <DataTable.Cell style={{flex: 1},{justifyContent: 'center'}} 
                              onPress={() => deleteUser(user.id,props.user.infos.token)
                                .then((res)=>{
                                  if(res.status === 200) {
                                    props.navigation.navigate('Admin')
                                  }
                                })
                              }
                            >
                              <Icon
                                  size={22} 
                                  name={'deleteuser'} 
                                  color={'red'}
                              />
                            </DataTable.Cell>
                        </DataTable.Row>
                      )
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
})

mapStateToProps = (store)=>{
  return {
      user: store.user
  }
}
export default connect(mapStateToProps)(AdminUser);