import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Image, Text, View, ScrollView, AsyncStorage } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getAllSections} from '../api/admin'

const Home = (props)=>{

  const [sections, setSections] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [basket, setBasket] = useState([]) 

  useEffect(()=>{

    propsLoading()

  }, [props.user])

  /*useEffect(()=>{

    setInterval(() => {
      
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

    }, 5000) 

  }, [basket])*/

  const propsLoading = ()=> {
          
    if(props.user.isLogged) 
    {
      setIsLoaded(true)
      checkAdminPanel()
      showSection()
    }

  }

  const checkAdminPanel = () => {

    if(props.user.infos.role === "admin")
    {
      return(
        <View style={styles.admin}>
          <TouchableOpacity
            onPress={()=>{
              props.navigation.navigate('Admin')
            }}
          >
            <Icon3 
              size={30} 
              name={'user-shield'} 
              style={styles.adminIcon}
            />
            <Text style={styles.adminText}>Accéder à l'administration de l'application</Text>
          </TouchableOpacity>
        </View>
      )
    }

  }

  const showSection = () => {
    getAllSections(props.user.infos.token)
    .then((response)=>{
      setSections(response.result)
    })
  }

  const goToSection = (id)=> {
    props.navigation.navigate('ProductSection', {id: id})
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
            <Image
              style={styles.logo}
              source={require('../assets/img/logo.png')}
            />
            <Text style={styles.title}
            >
              Bienvenue dans votre Drive
            </Text>            
            <View style={styles.test}>
              <TouchableOpacity
                onPress={()=>{
                  props.navigation.navigate('Basket')
                }}
              >                
                {basket.length > 0 &&
                <Text style={styles.textFromHeader}>
                  {basket.length}
                </Text>
                }
                <Icon5 
                  size={30} 
                  name={'basket'} 
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {isLoaded === false ?
        propsLoading()
        :
        checkAdminPanel()
        }
        <View style={styles.boxHeader}>
          <View style={styles.innerHeader}>
            <TouchableOpacity
              onPress={()=>{
                props.navigation.navigate('Notes')
              }}
            >
              <Image
                style={styles.imgHeader}
                source={{
                  uri:"https://res.cloudinary.com/dfastgw9s/image/upload/v1627920413/memo_isnlyg.png"
                }}
              />
              <Text style={styles.text}>
                Notes
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.innerHeader}>
            <TouchableOpacity
              onPress={()=>{
                props.navigation.navigate('Promotions')
              }}
            >  
            <Image
              style={styles.imgHeader}
              source={{
                uri:'https://res.cloudinary.com/dfastgw9s/image/upload/v1627920413/promo_a27k8p.png'
              }}
            />
              <Text style={styles.text}>
                Promotions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.innerHeader}>
            <TouchableOpacity
              onPress={()=>{
                props.navigation.navigate('DriveMap')
              }}
            >
              <Image
                  style={styles.imgHeader}
                  source={{
                    uri: "https://res.cloudinary.com/dfastgw9s/image/upload/v1627920413/map_orwyee.png"
                  }}
              />
              <Text style={styles.text}>
                Magasins
              </Text>
            </TouchableOpacity>  
          </View>
        </View>

        {sections.length > 0 &&
          <View style={styles.box}>
          {sections.map((section)=>{
            return <View style={styles.inner} key={section.id}>
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
                  <Text style={styles.innerText}>
                    {section.name}
                  </Text>
                </TouchableOpacity>  
              </View>
          })}
          </View>
        }
        
      </ScrollView>
    </View>    
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    test: {
      flexDirection: 'row',
    },
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
      justifyContent: 'space-around',
    },
    logo: {
      width:50,
      height:53,
    },
    title: {
      color:'#a3c2fa',
      fontSize: 18
    },
    adminIcon: {
      color:'black',
      textAlign: 'center'
    },
    adminText: {
      fontSize: 18,
      textAlign: 'center',
      color: "black"
    },
    icon: {
      color:'#a3c2fa',
    },
    textFromHeader: {
      color:"#a3c2fa",
      paddingLeft: 15
    },
    admin: {
      paddingTop: 15,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderColor: 'gray',
    },
    boxHeader: {
      flex:1,
      flexDirection: 'row',
      justifyContent:'space-around',
      borderBottomWidth: 1,
      borderColor: 'gray',
      marginTop: 20,
      paddingBottom: 20
    },
    box: {
      flex:1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent:'space-around',
    },
    innerHeader: {
      width: '33%',
      alignItems: 'center',
      borderColor: 'gray'
    },
    inner: {
      width: '50%',
      padding: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'gray'
    },
    imgHeader: {
      width:80,
      height:80
    },
    img: {
      width:100,
      height:100
    },
    innerText: {
      color: 'black',
      fontWeight: "bold",
      textAlign: 'center'
    },
    text: {
      color: "#17202a",
      fontWeight: "bold",
      textAlign: 'center',
      fontSize: 18
    }
  })


mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps)(Home);