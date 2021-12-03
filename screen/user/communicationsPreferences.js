import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, ImageBackground, ScrollView, CheckBox } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {Appbar} from 'react-native-paper'
import Icon2 from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {editCommunicationPreferences} from '../../api/user'
import {userCommunicationPreferences} from '../../api/user'

const CommunicationsPreferences = (props)=>{

    const [isSelectedEmail, setSelectionEmail] = useState(false)
    const [isSelectedSms, setSelectionSms] = useState(false)
    const [hooksLoaded,setHooksLoaded] = useState(false)

    useEffect(() => {
        userCommunicationPreferences(props.user.infos.id,props.user.infos.token)
        .then((response)=> {
            if(response.status === 200)
            {
                if(response.result[0].email === '1')
                {
                    setSelectionEmail(true)
                }
                if(response.result[0].sms === '1')
                {
                    setSelectionSms(true)
                }
                if(response.result[0].email === '0')
                {
                    setSelectionEmail(false)
                }
                if(response.result[0].sms === '0')
                {
                    setSelectionSms(false)
                }
                setHooksLoaded(true)
            }
		})
      }, [hooksLoaded])

    const onSubmitForm = () => {
        let data = {
            email: isSelectedEmail,
            sms: isSelectedSms,
        }

        editCommunicationPreferences(props.user.infos.id,data,props.user.infos.token)
        .then((response)=>{
            if(response.status === 200)
            {
                props.navigation.navigate('Account')      
            }
        })
    }
    
    return(    
            <ImageBackground 
                style={ styles.imgBackground } 
                resizeMode='cover' 
                source={require('../../assets/bg3.jpg')}
            >
            <View>
                <ScrollView style={styles.ScrollView}>
                    <Appbar.Header style={styles.headerContainer}>
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
                </Appbar.Header>
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
                        {hooksLoaded === true &&
                        <View style={styles.box2}>     
                            <Text style={styles.h1}>Vos préférences de communication :</Text>
                            <View style={styles.box3}> 
                                <CheckBox
                                    value={isSelectedEmail}
                                    onValueChange={setSelectionEmail}
                                />
                                <Text style={styles.label}>Etre informé par Email?</Text>
                            </View>
                            <View style={styles.box3}>   
                                <CheckBox
                                    value={isSelectedSms}
                                    onValueChange={setSelectionSms}
                                />
                                <Text style={styles.label}>Etre informé par SMS?</Text>
                            </View> 
                            <View style={styles.box4}> 
                                <TouchableOpacity
                                    onPress={(e)=>{
                                        onSubmitForm()
                                    }}
                                    style={styles.button}
                                >
                                    <Text style={styles.buttonText}
                                        >Enregistrer
                                    </Text>
                                </TouchableOpacity>
                            </View>
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
        justifyContent: 'space-between'
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
        fontSize: 20,
        color: "black",
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
    box3: {
        flexDirection: 'row',
        paddingLeft: 25,
        alignItems: 'center'
    },
    box4: {
        alignItems: 'center'
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
    label: {
        paddingLeft: 10,
    },
    button: {
        backgroundColor: "#219653",
        borderRadius: 50,
        width: wp('40%'),
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp('5%'),
        
    },
        buttonText: {
        fontSize: 18,
        color: "white",
        textAlign: 'center'
    }

})

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps)(CommunicationsPreferences);