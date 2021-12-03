import React , {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp
  } from 'react-native-responsive-screen';
import {registerUser} from '../../api/user';
import {setDefaultNotification} from '../../api/user';
import SelectDropdown from 'react-native-select-dropdown'

const Register = (props)=> {
	const civilityArray = ["Monsieur","Madame"]
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
	const [error, setError] = useState('')
	const [isValid, setIsValid] = useState(null)

	const onSubmitForm = ()=>{
		
		isValidForm()
		
		if(isValid === true)
		{
			let data = {
				civility: civility,
				firstName: firstName,
				lastName: lastName,
				birthday: birthday,
				zip: zip,
				city: city,
				phone: phone,
				email: email,
				password: password,
				address: address			
			}

			registerUser(data)
			.then((res)=>{
				console.log("AXIOS SAVE USER",res);
				if(res.status === 200) {
					let data = {
						user_id: res.result.insertId,
						email: true,
						sms: true,
					}
					setDefaultNotification(data)
					.then((res)=>{
						console.log("AXIOS NOTIFICATION",res);
						if(res.status === 200)
						{
							props.navigation.navigate('Login')
						}
					})	
				}
			})
		}
	}

	const isValidForm = () => {

		let regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		let regDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
	
		switch(true) {
			case (civility === '' || firstName === '' || lastName === '' || birthday  === ''|| zip === ''|| city === ''|| phone === ''|| email === ''|| password === ''|| address === ''):
				setIsValid(false)
				setError("Tous les champs doivent être remplis")
			break;
			
			case (!isNaN(firstName) || !isNaN(lastName) || !isNaN(city)):
				setIsValid(false)
				setError("Veuillez saisir un nom, prénom ou ville correct")
			break;

			case (regDate.test(birthday) === false):
				setIsValid(false)
				setError("La date de naissance n'est pas valide")
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

    return (
		<ImageBackground 
			style={ styles.imgBackground } 
			resizeMode='cover' 
			source={require('../../assets/bg3.jpg')}
		>
    	<View style={styles.container}>
    		<ScrollView style={styles.scrollContainer}>
    			<Text
					style={styles.title}
				>
					Enregistrez-vous :
				</Text>
				{isValid === false && <Text style={styles.error}>{error}</Text>}
				<SelectDropdown
                        defaultButtonText="Civilité"
                        buttonStyle={styles.selectDropDownStyle}
                        buttonTextStyle={styles.selectDropDownText}
                        data={civilityArray}
                        onSelect={(selectedItem, index) => {
                            setCivility(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
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
  container: {
    flex: 1,
	paddingTop: 50
  },
  imgBackground: {
	width: '100%',
	height: '100%',
	flex: 1 
  },
  title: {
	fontSize: 20,
	textAlign: 'center',
	marginBottom: 20,
	color: "#17202a"
  },
  scrollContainer: {
	width: wp('100%'),
	textAlign: 'center',
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
	paddingRight: 100
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

export default Register