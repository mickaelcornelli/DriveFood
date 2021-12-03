import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity, Text, View, TextInput, ImageBackground, ScrollView, CheckBox } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen'
import {connect} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'
import {saveOneProduct} from '../../api/admin';
import {getAllSections} from '../../api/admin'

const AddProduct = (props)=>{

useEffect(()=>{

    getAllSections(props.user.infos.token)
    .then((res)=>{
        res.result.forEach(element => listOfSections.push(element.name))
    })

}, [])

    const listOfSections = []
    const [section, setSection] = useState('');
    const [sectionName, setSectionName] = useState('');
	const [name, setName] = useState(''); 
	const [description, setDescription] = useState(''); 
	const [mark, setMark] = useState('');
	const [price, setPrice] = useState('');
	const [photo, setPhoto] = useState('');
	const [quantity, setQuantity] = useState('');
	const [ingredients, setingredients] = useState('');
	const [conservation, setConservation] = useState('');
	const [provider, setProvider] = useState('');
    const [promotion, setPromotion] = useState('');
	const [error, setError] = useState('')
	const [isValid, setIsValid] = useState(null)

const onSubmitForm = ()=>{
    let newPrice = price*((100-promotion)/100)

		isValidForm()
		
		if(isValid === true)
		{
			let data = {
				section: section,
				name: name.toLowerCase(),
				description: description.toLowerCase(),
				mark: mark.toLowerCase(),
				price: price,
				photo: photo,
				quantity: quantity,
				ingredients: ingredients,
				conservation: conservation,
				provider: provider,
                promotion: promotion,
                newPrice: newPrice		
			}
            console.log("DATA",data)

            
			saveOneProduct(data,props.user.infos.token)
			.then((res)=>{
				console.log("AXIOS SAVE PRODUCT",res);
				if(res.status === 200) {
					props.navigation.navigate('Admin')
				}
			})
            
		}
	}
   
	const isValidForm = () => {
        	
        let regexPhoto = /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/
        
		switch(true) {
			case (section === '' || name === '' || description === '' || mark  === ''|| price === ''|| photo === ''|| quantity === ''|| ingredients === ''|| conservation === ''|| provider === '' || promotion === ''):
				setIsValid(false)
				setError("Tous les champs doivent être remplis")
			break;
			
            case (isNaN(price)) :
				setIsValid(false)
				setError("Veuillez saisir un prix")
			break;

            case (isNaN(quantity)) :
				setIsValid(false)
				setError("Veuillez saisir une quantitée")
			break;

            case (promotion < 0 || promotion > 100):
				setIsValid(false)
				setError("La promotion est un % qui doit être compris entre 0 et 100")
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
                <Text style={styles.links}>Ajout d'un produit</Text>
                {isValid === false && <Text style={styles.error}>{error}</Text>}

                    <SelectDropdown
                        defaultButtonText="Rayon"
                        dropdownStyle={{height:400}}
                        buttonStyle={styles.selectDropDownStyle}
                        buttonTextStyle={styles.selectDropDownText}
                        data={listOfSections}
                        onSelect={(selectedItem, index) => {
                            setSection(index+1)
                            setSectionName(selectedItem)
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
                        placeholder="Nom du produit"
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
                        placeholder="Description"
                        placeholderTextColor="white" 
                        value={description}
                        onChangeText={(inputText)=>{
                            setDescription(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Marque"
                        placeholderTextColor="white" 
                        value={mark}
                        onChangeText={(inputText)=>{
                            setMark(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Prix"
                        placeholderTextColor="white" 
                        value={price}
                        onChangeText={(inputText)=>{
                            setPrice(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Lien de la photo"
                        placeholderTextColor="white" 
                        value={photo}
                        onChangeText={(inputText)=>{
                            setPhoto(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Quantité"
                        placeholderTextColor="white" 
                        value={quantity}
                        onChangeText={(inputText)=>{
                            setQuantity(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.textArea}
                        numberOfLines={5}
      				    multiline={true}
                        placeholder="Ingrédients"
                        placeholderTextColor="white" 
                        value={ingredients}
                        onChangeText={(inputText)=>{
                            setingredients(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.textArea}
                        numberOfLines={5}
      				    multiline={true}
                        placeholder="Astuce de conservation"
                        placeholderTextColor="white"
                        value={conservation}
                        onChangeText={(inputText)=>{
                            setConservation(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.textArea}
                        numberOfLines={5}
      				    multiline={true}
                        placeholder="Fournisseur"
                        placeholderTextColor="white" 
                        value={provider}
                        onChangeText={(inputText)=>{
                            setProvider(inputText)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Promotion"
                        placeholderTextColor="white" 
                        value={promotion}
                        onChangeText={(inputText)=>{
                            setPromotion(inputText)
                        }}
                    />
                    <TouchableOpacity
                        onPress={(e)=>{
                            onSubmitForm()
                        }}
                        style={styles.button}
                        >
                        <Text style={styles.buttonText}>Créer le produit</Text>
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
export default connect(mapStateToProps)(AddProduct);