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
import {getAllSections} from '../../api/admin';
import {deleteSection} from '../../api/admin';

const AdminSection = (props)=> {

    const [sections, setSections] = useState([])

    useEffect(()=>{

        getAllSections(props.user.infos.token)
        .then((response)=>{
            setSections(response.result)
        })

    }, [])

    const goToEditSection = (id)=>{
        props.navigation.navigate('EditSection', {id: id})
    }

    const goToSection = (id)=> {
        props.navigation.navigate('ProductSection', {id: id})
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
                        <Text style={styles.links}>Gestion des rayons</Text>
                    </View>
                </View>
                <View>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{flex: 1},{justifyContent: 'center'}}
                                onPress={() => props.navigation.navigate('AddSection')}
                            >
                                <Icon2 
                                size={22} 
                                name={'add-location'} 
                                color={"green"}
                                
                                />
                                <Text> Ajouter un rayon</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
                {sections.length > 0 &&
                    <View>
                        <View style={styles.box2}>
                            <Text style={styles.sectionTitle1}>Photo</Text>
                            <Text style={styles.sectionTitle2}>Rayon</Text>
                            <Text style={styles.sectionTitle3}>Editer</Text>
                            <Text style={styles.sectionTitle4}>Supprimer</Text>
                        </View>
                        {sections.map((section)=>{
                        return (<View style={styles.box2} key={section.id}>
                        <View style={styles.inner}>
                          <TouchableOpacity
                              onPress={()=>{
                                goToSection(section.id)
                              }}
                          >
                            <Image
                            style={styles.img}
                            source={{
                                  uri: section.photo
                                }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.inner2}>
                            <Text style={styles.text}>
                              {section.name}
                            </Text>
                        </View>
                        <View style={styles.inner3}>
                          <Icon3
                              size={18} 
                              name={'edit'} 
                              color={"#23496b"}
                              onPress={() => goToEditSection(section.id)}
                          />
                        </View>
                        <View style={styles.inner3}>
                          <Icon
                            size={22} 
                            name={'delete'} 
                            color={'red'}
                            onPress={() => deleteSection(section.id,props.user.infos.token)
                              .then((res)=>{
                                console.log("AXIOS DELETE SECTION",res);
                                if(res.status === 200) {
                                  getAllSections(props.user.infos.token)
                                  .then((response)=>{
                                    setSections(response.result)
                                  })
                                }
                              })
                            }
                          /> 
                        </View>
                      </View>)
                      })}
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
export default connect(mapStateToProps)(AdminSection);