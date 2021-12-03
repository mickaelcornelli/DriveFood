import React, { useState, useEffect } from 'react';
import {AsyncStorage } from 'react-native';
import Routes from '../navigation/routes';
import RoutesLog from '../navigation/routes-log';
import axios from 'axios';
import {config} from '../config';
import {connect} from 'react-redux';
import {connectUser} from '../actions/user/userAction';


const RequireAuth = (props)=>{
    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=>{
        retrieveData();
       
    }, [])
    useEffect(()=>{
        
        if(props.user.isLogged) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
       
    }, [props.user])
    
    const retrieveData = async ()=>{

        const token = await AsyncStorage.getItem('driveKey');
        console.log('TOKEN =', token)
        
        try {
            if(token === null) {
                setIsLogged(false);
            } else {
                axios.get(config.api_url+"/api/v1/checkToken", { headers: { "x-access-token": token }})
                .then((response)=>{
                    console.log(response.data);
                    if(response.data.status !== 200) {
                        setIsLogged(false);
                    } else {
                        setIsLogged(true);
                        let user = response.data.user[0];
                        user.token = token;
                        props.connectUser(user);
                    }
                })
            }
        } catch (error) {
            console.log("erreur: ", error)
        }
        
    }

    return (
        <React.Fragment>
            {isLogged ? <RoutesLog/> : <Routes />}
        </React.Fragment>
    )
}



mapDispatchToProps = {
    connectUser
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);