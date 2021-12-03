import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Text, View, TextInput, ImageBackground, ScrollView} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import {saveOneSection} from '../../api/admin'

const AddSection = (props)=>{

    const [name, setName] = useState(''); 
    const [photo, setPhoto] = useState(''); 
	const [error, setError] = useState('')
	const [isValid, setIsValid] = useState(null)

const onSubmitForm = ()=>{

		isValidForm()
		
		if(isValid === true)
		{
			let data = {
				name: name,
				photo: photo.toLowerCase(),	
			}
            console.log("DATA",data)
  
			saveOneSection(data,props.user.infos.token)
			.then((res)=>{
				console.log("AXIOS SAVE SECTION",res);
				if(res.status === 200) {
					props.navigation.navigate('Admin')
				}
			})
            
		}
	}
   
	const isValidForm = () => {

        let regexPhoto = /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/

		switch(true) {
			case (name === '' || photo === ''):
				setIsValid(false)
				setError("Tous les champs doivent être remplis")
			break;
            case (!isNaN(name)):
                setIsValid(false)
				setError("Veuillez saisir un nom de rayon")
			break;
            case (regexPhoto.test(photo) === false):
				setIsValid(false)
				setError("Le lien de la photo ne correspond pas à un upload via cloudinary")
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
                <Text style={styles.links}>Ajout d'un rayon</Text>
                {isValid === false && <Text style={styles.error}>{error}</Text>}
                    <TextInput 
                        style={styles.input}
                        placeholder="Nom du rayon"
                        placeholderTextColor="white"
                        value={name}
                        onChangeText={(inputText)=>{
                            setName(inputText)
                        }}
                    />
                    <TextInput 
                        style={styles.textArea}
                        numberOfLines={5}
      				    multiline={true}
                        placeholder="Lien photo du rayon"
                        placeholderTextColor="white"
                        value={photo}
                        onChangeText={(inputText)=>{
                            setPhoto(inputText)
                        }}
                    />
                    <TouchableOpacity
                        onPress={(e)=>{
                            onSubmitForm()
                        }}
                        style={styles.button}
                        >
                        <Text style={styles.buttonText}>Créer le rayon</Text>
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
    textAlign:'center',
    backgroundColor: '#17202a',
    width: wp('60%'),
    height: 40,
    borderRadius: 50,
    marginBottom: 15,
    marginLeft: wp('20%'),
    paddingLeft: wp('5%'),
    color: 'white'
},
textArea: {
    textAlign:'center',
    backgroundColor: '#17202a',
    width: wp('60%'),
    height: 120,
    borderRadius: 10,
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
export default connect(mapStateToProps)(AddSection);