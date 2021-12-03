import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Text, View, TextInput, ImageBackground, ScrollView, CheckBox } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
import {connect} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'
import {saveOneUser} from '../../api/admin';

const AddUser = (props)=>{

    const civilityArray=["Madame","Monsieur"]
    const roleArray=["user","admin"]
    const [civility, setCivility] = useState(''); 
	const [firstName, setFirstName] = useState(''); 
	const [lastName, setLastName] = useState(''); 
	const [birthday, setBirthday] = useState('');
	const [address, setAddress] = useState('');
	const [zip, setZip] = useState('');
	const [city, setCity] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
	const [error, setError] = useState('')
	const [isValid, setIsValid] = useState(null)

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
				email: email,
				password: password,
				address: address.toLowerCase(),
                role: role.toLowerCase()			
			}

			saveOneUser(data,props.user.infos.token)
			.then((res)=>{
				if(res.status === 200) {
					props.navigation.navigate('Admin')
				}
			})
		}
	}

	const isValidForm = () => {
        
		let regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		let regDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
	
		switch(true) {
			case (civility === '' || firstName === '' || lastName === '' || birthday  === ''|| zip === ''|| city === ''|| phone === ''|| email === ''|| password === ''|| address === '' || role === ''):
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

			case (regMail.test(email) === false):
				setIsValid(false)
				setError("L'email est incorrect")
			break;

			case (password.length < 8):
				setIsValid(false)
				setError("Votre mot de passe doit contenir 8 caractères minimum")
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
                <Text style={styles.links}>Ajout d'un utilisateur</Text>
                {isValid === false && <Text style={styles.error}>{error}</Text>}
                    <SelectDropdown
                        defaultButtonText="Civilité"
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
                    <TextInput 
                            style={styles.input}
                            placeholder="Prénom"
                            placeholderTextColor="white"
                            value={firstName}
                            onChangeText={(inputText)=>{
                                setFirstName(inputText)
                            }}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Nom"
                        placeholderTextColor="white" 
                        value={lastName}
                        onChangeText={(inputText)=>{
                            setLastName(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Date de naissance"
                        placeholderTextColor="white" 
                        value={birthday}
                        onChangeText={(inputText)=>{
                            setBirthday(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Adresse"
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
                        placeholder="Code postal"
                        placeholderTextColor="white" 
                        value={zip}
                        onChangeText={(inputText)=>{
                            setZip(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ville"
                        placeholderTextColor="white" 
                        value={city}
                        onChangeText={(inputText)=>{
                            setCity(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Téléphone"
                        placeholderTextColor="white" 
                        value={phone}
                        onChangeText={(inputText)=>{
                            setPhone(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="white"
                        value={email}
                        onChangeText={(inputText)=>{
                            setEmail(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe"
                        placeholderTextColor="white" 
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(inputText)=>{
                            setPassword(inputText)
                        }}
                    />
                   <SelectDropdown
                        defaultButtonText="Rôle"
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
                    <Text style={styles.buttonText}>Créer le compte</Text>
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
    marginRight: 120
},
  button: {
	backgroundColor: "#219653",
	borderRadius: 50,
	width: wp('45%'),
	height: 40,
	alignItems: "center",
	justifyContent: "center",
	marginTop: wp('5%'),
	marginBottom: wp('10%'),
	marginLeft: wp('27%')
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
export default connect(mapStateToProps)(AddUser);