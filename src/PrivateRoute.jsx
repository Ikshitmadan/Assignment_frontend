import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react'
const PrivateRoute = () => {

    const [userId,setUserId]=useState(null);

    const [loading,setloading]=useState(true);
    const fetchuser=async()=>{
        try{

            setloading(true);
            const {data}= await axios.get('/auth');
            
            console.log(data.id);
            if(data.id){
               setUserId(data.id);
               setloading(false)
        }

      
    }
        catch(err){

            setloading(false)

        }
      

    }
    useEffect(()=>{

        fetchuser()
        
    },[])


    if(loading){
    console.log(loading);
    
        return (
            <>
            <Spinner size='md' />
            </>
        )
    }

    console.log(loading);
    console.log(userId);
    let auth = {'token':true}
    return(
        userId ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute
