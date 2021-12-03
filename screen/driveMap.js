import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import MapView, {Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {getAllStore} from '../api/map';

const Map = (props)=>{

  //default location
  const DEFAULT_COORD = {
    coords: { //  Eiffel Tower
      latitude: 48.85844,
      longitude: 2.294555
    }
  }

  const [location, setLocation] = useState(DEFAULT_COORD)
  const [store, setStore] = useState([])

  useEffect(()=>{
    getGeolocAsync()
  }, [])

  const getGeolocAsync = async ()=>{

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("STATUS",status)

    if(status !== ('granted')){

      throw new Error('Location permission not granted')
      return

  }

    let myLocation = await Location.getCurrentPositionAsync({})
    setLocation(myLocation);
    console.log("location",location)
  }

  const essai = async ()=>{

    getAllStore(props.user.infos.token)
    .then((response)=>{
      //console.log("STORE",response.result)
      setStore(response.result)
    })

  }

    return (
      <ImageBackground 
        style={ styles.imgBackground } 
        resizeMode='cover' 
        source={require('../assets/bg3.jpg')}
      >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Géolocalisation des magasins :</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={(e)=>{
                essai()
              }}
          >
            <Text>Appuies ici</Text>
          </TouchableOpacity>
        </View>
          {location && <MapView
              style={{flex: 2}}
              region={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 5,
                  longitudeDelta: 5
              }}
              showsUserLocation = {true}
              scrollEnabled={true}
              liteMode={false}
          >
          {store.map((stores)=>{
            console.log("STORES",stores)
              return (<MapView.Marker
                  title={stores.name}
                  coordinate={{
                    latitude: parseFloat(stores.lat),
                    longitude: parseFloat(stores.lng)
                  }}
                  key={stores.id}
            >
            <Callout style={styles.markers}>
                <Text>{stores.name}</Text>
                <Text>{stores.address} {stores.zip} {stores.city}</Text>
                <Text>{stores.description}</Text>
            </Callout>
          </MapView.Marker>)
                    }) }              
          </MapView>}  
      </View>       
      </ImageBackground>
    )
}
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: 30
      },
      imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1 
      },
      title: {
        color: "white",
        fontSize: 20
      },
      header: {
        height: 100,
        paddingTop: 10,
        backgroundColor: '#17202a',
        alignItems: "center",
        justifyContent: "center",
      },
      button: {
        width: wp('30%'),
        height: wp('10%'),
        borderRadius: 50,
        marginTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
      },
      markers: {
        
       
      }
    });
  

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps)(Map);