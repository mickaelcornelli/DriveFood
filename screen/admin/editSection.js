import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Text, View, TextInput, ImageBackground, ScrollView} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import {getAllSections} from '../../api/admin'
import {updateSection} from '../../api/admin'

const AddSection = (props)=>{
    const listOfSectionsName = []
    const listOfSections = []
    const [name, setName] = useState('');
    const [newName, setNewName] = useState('');  
    const [photo, setPhoto] = useState(''); 
    const [newPhoto, setNewPhoto] = useState('');  
	const [error, setError] = useState('')
	const [isValid, setIsValid] = useState(null)

useEffect(()=>{

getAllSections(props.user.infos.token)
    .then((res)=>{
        res.result.forEach(element => listOfSections.push(element))
        res.result.forEach(element => listOfSectionsName.push(element.name))
        for (let index = 0; index < listOfSections.length; index++) {
            if(props.navigation.getParam('id') == listOfSections[index].id)
            {
                setName(listOfSections[index].name)
                setPhoto(listOfSections[index].photo)
            }
        }
    })

}, [])

const onSubmitForm = ()=>{

		isValidForm()
		
		if(isValid === true)
		{
			let data = {
				name: newName,
				photo: newPhoto.toLowerCase(),	
			}
            console.log("DATA",data)
  
			updateSection(props.navigation.getParam('id'), data, props.user.infos.token)
			.then((res)=>{
				console.log("AXIOS UPDATE SECTION",res);
				if(res.status === 200) {
					props.navigation.navigate('Admin')
				}
			})
            
		}
	}
   
	const isValidForm = () => {

        let regexPhoto = /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/

		switch(true) {
			case (newName === '' || newPhoto === ''):
				setIsValid(false)
				setError("Tous les champs doivent être remplis")
			break;

            case (!isNaN(newName)):
                setIsValid(false)
				setError("Veuillez saisir un nom de rayon")

            case (regexPhoto.test(newPhoto) === false):
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
                <Text style={styles.links}>Edition d'un rayon</Text>
                {isValid === false && <Text style={styles.error}>{error}</Text>}
                    <TextInput 
                        style={styles.input}
                        placeholder={name}
                        placeholderTextColor="white"
                        value={newName}
                        onChangeText={(inputText)=>{
                            setNewName(inputText)
                        }}
                    />
                    <TextInput 
                        style={styles.textArea}
                        numberOfLines={5}
      				    multiline={true}
                        placeholder={photo}
                        placeholderTextColor="white"
                        value={newPhoto}
                        onChangeText={(inputText)=>{
                            setNewPhoto(inputText)
                        }}
                    />
                    <TouchableOpacity
                        onPress={(e)=>{
                            onSubmitForm()
                        }}
                        style={styles.button}
                        >
                        <Text style={styles.buttonText}>Editer le rayon</Text>
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