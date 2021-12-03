import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Text, View, TextInput, ImageBackground, ScrollView, CheckBox } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
import {connect} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'
import {updateUser} from '../../api/admin';
import {userPersonnalInformations} from '../../api/user'

const EditUser = (props)=>{
    const roleArray=["user","admin"]
    const [civility, setCivility] = useState(''); 
	const [firstName, setFirstName] = useState(''); 
	const [lastName, setLastName] = useState(''); 
	const [birthday, setBirthday] = useState('');
	const [address, setAddress] = useState('');
	const [zip, setZip] = useState('');
	const [city, setCity] = useState('');
	const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
	const [error, setError] = useState('')
	const [isValid, setIsValid] = useState(null)

    useEffect(()=>{

        userPersonnalInformations(props.navigation.getParam('id'), props.user.infos.token)
        .then((res)=>{
            console.log("res result",res.result[0])
            setCivility(res.result[0].civility)
            setFirstName(res.result[0].firstName)  
            setLastName(res.result[0].lastName)    
            setBirthday(res.result[0].birthday) 
            setAddress(res.result[0].address) 
            setZip(res.result[0].zip) 
            setCity(res.result[0].city) 
            setPhone(res.result[0].phone) 
            setRole(res.result[0].role) 
        })
        
    }, [])
    
    

	const onSubmitForm = ()=>{
		
		isValidForm()
		
		if(isValid === true)
		{
			let data = {
				civility: civility.toLowerCase(),
				firstName: firstName.toLowerCase(),
				lastName: lastName.toLowerCase(),
				birthday: birthday,
				zip: zip,
				city: city.toLowerCase(),
				phone: phone,
				address: address.toLowerCase(),
                role: role.toLowerCase()			
			}

			updateUser(props.navigation.getParam('id'),data,props.user.infos.token)
			.then((res)=>{
				if(res.status === 200) {
					props.navigation.navigate('Admin')
				}
			})
		}
	}

	const isValidForm = () => {
        
		let regDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
	
		switch(true) {
			case (civility === '' || firstName === '' || lastName === '' || birthday  === ''|| zip === ''|| city === ''|| phone === ''|| address === '' || role === ''):
				setIsValid(false)
				setError("Tous les champs doivent être remplis")
			break;
			
			case (!isNaN(firstName) || !isNaN(lastName) || !isNaN(city)):
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

            case (role.toLowerCase() !== "admin" && role.toLowerCase() !== "user"):
				setIsValid(false)
				setError("Le rôle de l'utilisateur doit être admin ou user")
			break;

			default: setIsValid(true)
			break;
		}
	}

    return(
        <ImageBackground 
            style={styles.imgBackground } 
            resizeMode='cover' 
            source={require('../../assets/bg3.jpg')}
        >
        <View style={styles.container}>
            <ScrollView style={styles.ScrollView}>
                <Text style={styles.links}>Modification d'un utilisateur</Text>
                {isValid === false && <Text style={styles.error}>{error}</Text>}
                    <TextInput 
                            style={styles.input}
                            placeholder={civility}
                            placeholderTextColor="white"
                            value={civility}
                            onChangeText={(inputText)=>{
                                setCivility(inputText)
                            }}
                    />
                    <TextInput 
                            style={styles.input}
                            placeholder={firstName}
                            placeholderTextColor="white"
                            value={firstName}
                            onChangeText={(inputText)=>{
                                setFirstName(inputText)
                            }}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder={lastName}
                        placeholderTextColor="white" 
                        value={lastName}
                        onChangeText={(inputText)=>{
                            setLastName(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={birthday}
                        placeholderTextColor="white" 
                        value={birthday}
                        onChangeText={(inputText)=>{
                            setBirthday(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={address}
                        placeholderTextColor="white" 
                        value={address}
                        onChangeText={(inputText)=>{
                            setAddress(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={5}
                        placeholder={zip}
                        placeholderTextColor="white" 
                        value={zip}
                        onChangeText={(inputText)=>{
                            setZip(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={city}
                        placeholderTextColor="white" 
                        value={city}
                        onChangeText={(inputText)=>{
                            setCity(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder={phone}
                        placeholderTextColor="white" 
                        value={phone}
                        onChangeText={(inputText)=>{
                            setPhone(inputText)
                        }}
                    />
                    <SelectDropdown
                        defaultButtonText={role}
                        buttonStyle={styles.selectDropDownStyle}
                        buttonTextStyle={styles.selectDropDownText}
                        data={roleArray}
                        onSelect={(selectedItem, index) => {
                             setRole(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item) => {
                            return item
                        }}
                    />
                    <TouchableOpacity
                    onPress={(e)=>{
                        onSubmitForm()
                    }}
                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>Modifier l'utilisateur</Text>
                </TouchableOpacity>
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
container: {
    flex: 1,
	paddingTop: 50
},
ScrollView: {
    width: wp('100%'),
},
links: {
    fontSize: 25,
    textAlign: 'center',
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    color: '#a3c2fa',
    backgroundColor: '#17202a',
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
},
  button: {
	backgroundColor: "#219653",
	borderRadius: 50,
	width: wp('50%'),
	height: 40,
	alignItems: "center",
	justifyContent: "center",
	marginTop: wp('5%'),
	marginBottom: wp('10%'),
	marginLeft: wp('25%')
  },
  buttonText: {
	fontSize: 18,
	color: "white"
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
export default connect(mapStateToProps)(EditUser);