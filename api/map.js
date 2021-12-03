import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {config} from '../config';

export const getAllStore = (token)=>{
    
    return axios.get(config.api_url+'/api/v1/store', {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}