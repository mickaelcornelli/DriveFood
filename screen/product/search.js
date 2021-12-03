import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {searchProduct} from '../../api/product'
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import { ScrollView } from 'react-native-gesture-handler';


const Search = (props)=>{
    
    const [search, setSearch] = useState('');
    const [dataSearch, setDataSearch] = useState('');
    const [searchBoolean, setSearchBoolean] = useState(false)
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = ()=> {
        if(search === '')
        {
            setErrorMsg("Veuillez saisir un nom de produit")
        }
        else
        {
            setErrorMsg('')
            let data = {
                search: search
            }
            
            searchProduct(data, props.user.infos.token)
                .then((res)=>{
                    console.log(res)
                    if (res.status > 0)
                    {
                        setSearchBoolean(true)
                    }
                    
                    setDataSearch(res.result)
            })
        }
        

    }

    const goToDetailProduct = (id)=>{
        props.navigation.navigate('DetailProduct', {id: id})
    }

    
    return(
        <ImageBackground 
            style={ styles.imgBackground } 
            resizeMode='cover' 
            source={require('../../assets/bg3.jpg')}
        >
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
                  props.navigation.navigate('Basket')
                }}
              >
                <Icon5 
                  size={30} 
                  name={'basket'} 
                  style={styles.icon}
                />
                <Text style={styles.textFromHeader}>
                  Panier
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.searchBar}>
        {errorMsg !== '' && <Text style={styles.error}>{errorMsg}</Text>}
            <View style={styles.row}>
                <Icon
                    size={30} 
                    name={'search1'} 
                    style={styles.iconSearch}
                />
                
                <TextInput style={styles.input}
                    type="text"
                    placeholder="Saisir le nom du produit ..."
                    placeholderTextColor="white"
                    value={search}
                    onChangeText={(inputText)=>{
                        setSearch(inputText)
                    }}
                />
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={(e)=>{
                        onSubmit()
                    }}
                    style={styles.button}
                >
                
                <Text style={styles.submit}>
                    Rechercher
                </Text>
                </TouchableOpacity>
            </View>
        </View>

        <View>     
        {dataSearch.length > 0 ?  
        
        dataSearch.map((inputSearch)=>{
        return (<View style={styles.box} key={inputSearch.id}>
            <View style={styles.inner3}>
                <TouchableOpacity
                    onPress={()=>{
                        goToDetailProduct(inputSearch.id)
                    }}
                >
                    <Image
                        style={styles.imgHeader}
                        source={{
                            uri: inputSearch.photo
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.inner3}>
                <Text style={styles.text}>
                    {inputSearch.name}
                </Text>
            </View>
            <View style={styles.inner1}>
                <Text style={styles.text}>
                    {inputSearch.price}€
                </Text>                  
            </View>
        </View>)
        })
         : searchBoolean === false ? <Text style={styles.error}></Text>
         : <Text style={styles.error}>Aucun produits trouvés !</Text>
        }
        </View>
        </ScrollView>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    scrollView: {
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
        paddingLeft:5,
        paddingRight: 5,
    },
    logo: {
        width:50,
        height:53,
    },
    title: {
        color:'#a3c2fa',
        fontSize: 18
    },
    icon: {
        color:'#a3c2fa',
    },
    textFromHeader: {
        color:"#a3c2fa",
    },
    searchBar: {
        paddingTop: 50,
        backgroundColor: '#17202a',
    },
    row: {
        flexDirection: 'row'
    },
    iconSearch: {
        marginLeft: hp('7%'),
        marginTop: hp('4%'),
        color: 'white',
        fontSize: 30
    },
    input : {
        color: 'white',
        height: 80,
        fontSize: 18,  
        paddingLeft: 15    
    },
    button: {
        backgroundColor: "#219653",
        width: wp('100%'),
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        color: 'white'
    },
    box: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-around',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    inner1: {
        width: wp('20%'),
        alignItems: 'center',
        justifyContent: "center",        
        borderColor: 'gray'
    },
    inner3: {
        width: wp('40%'),
        alignItems: 'center',
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: 'gray'
    },
    imgHeader: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },

    submit: {
        color: 'white',
        fontSize: 18
    },
    text: {
        color: "black",
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 18
    },
    error: {
        paddingTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        color: "red",
    }
})

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps)(Search);