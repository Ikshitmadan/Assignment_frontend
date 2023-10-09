import { Alert, Box, Button, Center, Link, Radio, RadioGroup, Select, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import axios from 'axios'

export const Login = () => {

  const toast = useToast()
 const [email,setemail]=useState("");
const [password,setpassword]=useState("");
  const navigate=useNavigate()


async function submit(){
console.log(`hi`);
  console.log(email,"jss");

  if(!email || !password){

    toast({
      title: 'Field Missing',
      description: 'Email or password  field missing.',
      status: 'warning',
      duration: 9000,
      isClosable: true,
      position:'top'
    })


    return;
  }


  try{

    const {data}= await axios.post('/login',{
      email,
      password
     })
    
     if(data.error){
      toast({
        title: 'Incorrect credentials',
        description: data.error.message,
        status: 'warning',
        position:'top',
        duration: 9000,
        isClosable: true,
      })
localStorage.setItem('uid',JSON.stringify(data._id));
     }

     if(data?._id){
     navigate('/dashboard');
     }


     console.log(data);
    
    

  }

  catch(err){

    console.log(err);
    toast({
      title: 'Incorrect credentials',
      description: err.response.data.error.message,
      status: 'warning',
      duration: 9000,
      isClosable: true,
      position:'top'
    })
  }




}
   




 





   console.log(email,password);

  return (
   
<Box bg="lightblue" minH='100vh'  display='flex'  alignItems='center' justifyContent='center'>
  
    <Box bg="white" borderRadius="5px"  padding="20px" boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;" className='container'  maxWidth="90%" display='flex' flexDirection='column' justifyContent='center' width={{lg:"500px",md:"450px"}}  minH={{lg:"350"}} height="max-content" gap={{lg:"1rem",md:"1rem",sm:"0.5rem",base:"0.5rem"}} >
<Center>
  <Text fontSize='4xl' color="black"  fontWeight="bolder"  >Login</Text>
</Center>
<Input borderRadius="7px" onChange={(e)=>setemail(e.target.value)}  padding="10px" type='email' placeholder='Email'></Input>
<Input borderRadius="7px" onChange={(e)=>setpassword(e.target.value)}  padding="10px" type='password' placeholder='password'></Input>
<Button colorScheme='orange' onClick={()=>submit()} >Login</Button>

<Center>
<ChakraLink fontSize='2xl'  as={ReactRouterLink} to='/register'>
  Sign up
</ChakraLink>
</Center>
</Box>

    </Box>



    
  )
}
