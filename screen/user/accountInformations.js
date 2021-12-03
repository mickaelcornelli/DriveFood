import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image, ImageBackground, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'
import {userPersonnalInformations} from "../../api/user";
import {updateUser} from "../../api/user";

const AccountInformations = (props)=>{

    const civilityArray=["Madame","Monsieur"]
    const [userInformation, setUserInformation] = useState([]);
    const [civility, setCivility] = useState(''); 
	const [firstName, setFirstName] = useState(''); 
	const [lastName, setLastName] = useState(''); 
	const [birthday, setBirthday] = useState('');
	const [address, setAddress] = useState('');
	const [zip, setZip] = useState('');
	const [city, setCity] = useState('');
	const [phone, setPhone] = useState('');
    const [error, setError] = useState('')
	const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    userPersonnalInformations(props.user.infos.id, props.user.infos.token)
    .then((res)=>{
        setUserInformation(res.result[0])
    }) 
      
  }, []);
        

    const onSubmitForm = ()=>{

        isValidForm()

        if(isValid === true)
		{
			let data = {
				civility: civility,
				firstName: firstName.toLowerCase(),
				lastName: lastName.toLowerCase(),
				birthday: birthday,
				zip: zip,
				city: city.toLowerCase(),
				phone: phone,
				address: address.toLowerCase(),		
			}

			updateUser(props.user.infos.id,data,props.user.infos.token)
			.then((res)=>{
				console.log("AXIOS SAVE USER",res);
				if(res.status === 200) {
					props.navigation.navigate('Account')
				}
			})
		}
    }

    const isValidForm = () => {
        
		let regDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
	
		switch(true) {
			case (civility === '' || firstName === '' || lastName === '' || birthday  === ''|| zip === ''|| city === ''|| phone === ''|| address === ''):
				setIsValid(false)
				setError("Tous les champs doivent être remplis")
			break;
			
			case (!isNaN(firstName)):
				setIsValid(false)
				setError("Veuillez saisir un nom correct")
			break;

            case (!isNaN(lastName)):
				setIsValid(false)
				setError("Veuillez saisir un prénom correct")
			break;

            case (!isNaN(city)):
				setIsValid(false)
				setError("Veuillez saisir une ville correcte")
			break;

			case (regDate.test(birthday) === false):
				setIsValid(false)
				setError("La date de naissance est incorrecte. Elle doit correspondre à ce format : 01/01/2000")
			break;

			case (isNaN(zip) || zip.length < 5):
				setIsValid(false)
				setError("Le code postal est incorrect")
			break;

			case (isNaN(phone) || phone.length < 10):
				setIsValid(false)
				setError("Le numéro de téléphone est incorrect")
			break;
            
			default: setIsValid(true)
			break;
		}
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
                                    props.navigation.navigate('CommunicationsPreferences')         
                                }}
                            >
                            <Text style={styles.links}>Vos préférences de communications</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box2}>
                        <Text style={styles.h1}>A propos de vous :</Text>
                        {isValid === false && <Text style={styles.error}>{error}</Text>}

                        {userInformation !== [] &&
                        <View>
                            <SelectDropdown
                                defaultButtonText={userInformation.civility}
                                buttonStyle={styles.selectDropDownStyle}
                                buttonTextStyle={styles.selectDropDownText}
                                data={civilityArray}
                                onSelect={(selectedItem, index) => {
                                    setCivility(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item) => {
                                    return item
                                }}
                            />
                            <TextInput style={styles.input}
                                placeholder={userInformation.firstName}
                                placeholderTextColor="white"
                                value={firstName}
                                onChangeText={(inputText)=>{
                                    setFirstName(inputText)
                                }}
                            />
                            <TextInput style={styles.input}
                                placeholder={userInformation.lastName}
                                placeholderTextColor="white" 
                                value={lastName}
                                onChangeText={(inputText)=>{
                                    setLastName(inputText)
                                }}
                            />
                            <TextInput style={styles.input}
                                placeholder={userInformation.birthday}
                                placeholderTextColor="white" 
                                value={birthday}
                                onChangeText={(inputText)=>{
                                    setBirthday(inputText)
                                }}
                            />
                            <TextInput style={styles.input}
                                placeholder={userInformation.address}
                                placeholderTextColor="white" 
                                value={address}
                                onChangeText={(inputText)=>{
                                    setAddress(inputText)
                                }}
                            />
                            <TextInput style={styles.input}
                                placeholder={userInformation.zip}
                                placeholderTextColor="white" 
                                value={zip}
                                onChangeText={(inputText)=>{
                                    setZip(inputText)
                                }}
                            />
                            <TextInput style={styles.input}
                                placeholder={userInformation.city}
                                placeholderTextColor="white" 
                                value={city}
                                onChangeText={(inputText)=>{
                                    setCity(inputText)
                                }}
                            />
                            <TextInput style={styles.input}
                                placeholder={userInformation.phone}
                                placeholderTextColor="white" 
                                value={phone}
                                onChangeText={(inputText)=>{
                                    setPhone(inputText)
                                }}
                            />
                            <TouchableOpacity
                                onPress={(e)=>{
                                    onSubmitForm()
                                }}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Enregistrer les modifications</Text>
                            </TouchableOpacity>
                        </View>  
                        }
                    </View>
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
        alignItems:'center',
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
    selectDropDownStyle: {
        width: wp('60%'),
        height: 40,
        marginRight: wp('20%'),
        marginBottom: 15,
        borderRadius: 50,
        backgroundColor:'#17202a'
    },
    selectDropDownText: {
        fontSize: 16,
        color:'white',
        marginRight: 120
    },
    input: {
        backgroundColor: '#17202a',
        width: wp('60%'),
        height: 40,
        borderRadius: 50,
        marginBottom: 15,
        marginLeft: wp('20%'),
        paddingLeft: wp('5%'),
        color: 'white'
      },
      button: {
        backgroundColor: "#219653",
        borderRadius: 50,
        width: wp('50%'),
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp('5%'),
        marginBottom: wp('10%'),
        marginLeft: wp('24%'),
        
      },
      buttonText: {
        fontSize: 18,
        color: "white",
        textAlign: 'center'
      },
      error: {
        color: "red",
        textAlign: "center",
        fontSize: 18,
        paddingBottom: 10
    }

})
  
mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps)(AccountInformations);                       