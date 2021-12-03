import React, {useState, useEffect} from 'react';
import { StyleSheet, ImageBackground, Text, View, TextInput, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {loginUser} from '../../api/user';
import {connect} from 'react-redux';
import {connectUser} from '../../actions/user/userAction';

const Login = (props)=> {
 
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('')
	const [isValid, setIsValid] = useState(null)

    const onSubmitForm = ()=>{

		isValidForm()
		
		if(isValid === true)
		{

			let data = {
				email: email,
				password: password
			}
				console.log("login",data)

			loginUser(data)
			.then((res)=>{
				console.log("RES",res)
				if(res.status == 401)
				{
					setIsValid(false)
					setError("L'email / mot de passe est incorrect")
				}
				else
				{
					console.log('RESPONSE loginUser(data)',res);
					storeData(res.token);

					let user = res.user;
					user.token = res.token;
					props.connectUser(res.user);
				}
			})

		}
    }
    
    const storeData = async (token) => {
        try {
          await AsyncStorage.setItem('driveKey', token);
        } catch (error) {
          console.log('error Token',error)
        }
    }

	const isValidForm = () => {
		let regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		switch(true) {
			case (email === '' || password === ''):
				setIsValid(false)
				setError("Tous les champs doivent être remplis")
			break;
			
			case (regexMail.test(email) === false):
				setIsValid(false)
				setError("Vous devez saisir un email")
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
					Connectez-vous :
				</Text>
				{isValid === false && <Text style={styles.error}>{error}</Text>}
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Email"
					placeholderTextColor="white" 
    				value={email}
                	onChangeText={(inputText)=>{
                    	setEmail(inputText)
                	}}
    			/>
				<TextInput
    				style={styles.input}
    				secureTextEntry={true}
    				placeholder="Mot de passe"
					placeholderTextColor="white" 
    				value={password}
                	onChangeText={(inputText)=>{
                    	setPassword(inputText)
                	}}
    			/>

    			<TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        onSubmitForm();
                    }}
				>
    				<Text style={styles.buttonText}>Se connecter</Text>
    			</TouchableOpacity>
    		</ScrollView>
    	</View>
		</ImageBackground>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	paddingTop: hp('30%')
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
  input: {
  	backgroundColor: '#17202a',
  	width: wp('60%'),
	height: 40,
	borderRadius: 50,
	marginBottom: 15,
	marginLeft: wp('20%'),
	paddingLeft: wp('5%'),
	color: "white"
  },
  button: {
	backgroundColor: "#219653",
	borderRadius: 50,
	width: wp('40%'),
	height: 40,
	alignItems: "center",
	justifyContent: "center",
	marginTop: wp('5%'),
	marginLeft: wp('30%')
  },
  buttonText: {
	  fontSize: 18,
	  color: "white"
  },
  error: {
	color: "red",
	textAlign: "center",
	fontSize: 18,
	paddingBottom: 5
  }
})

mapDispatchToProps = {
    connectUser
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Login);