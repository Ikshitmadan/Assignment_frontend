import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { transform } from 'framer-motion';
import { Navbar } from './Navbar';
export const User = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const location = useLocation();
  const pathname = location.pathname;
  const userId = pathname.split('/').pop(); 
const [name,setname]=useState("");

const [email,setemail]=useState("");

const [phoneNumber,setphoneNumber]=useState("");
const [user,setuser]=useState(null);

const navigate=useNavigate()
const handleEdit=async()=>{

  console.log('inode');

  try{

    const {data}= await axios.patch(`/user/${user._id}`,{
      name,email,phoneNumber
    });

    console.log(name,email);
  
    if(!data.error){
      setuser({
        ...user,
        name,
        email,
        phoneNumber
      })
     
    }

 
  
    if(localStorage.getItem('users')!=null){
  
      const UsersData=JSON.parse(localStorage.getItem("users"));
  
      const filteredata=UsersData.filter((user)=>user._id!=userId);
  console.log(UsersData.length," ",filteredata.length);
      const modifiedUser={
        ...user,
  email,
  name,
  phoneNumber
      }
  
      filteredata.push(modifiedUser);
  
  
      localStorage.setItem('users', JSON.stringify(filteredata));
onClose()
  }


 
  navigate('/dashboard');
  }

  catch(err){
    console.log(err);
  }

  

}

const fetchuser=async()=>{

  console.log(userId);
  const {data}=await axios.get(`/user/${userId}`);

  if(!data.error){

setuser(data);

setemail(data.email);

setname(data.name);

setphoneNumber(data.phoneNumber);


  }


  if(localStorage.getItem('uid')){


  }
}

  useEffect(()=>{

   
   fetchuser()
    

  },[])




  return (
    <>
    <Navbar/>
   {user &&<Box bg="lightpink" minHeight="92vh" display="flex" alignItems="center" justifyContent="center">
     <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
    <Input type='text' mb="1rem"  onChange={(e)=>setname(e.target.value)} value={name}></Input>
   <Input type='email' mb="1rem" onChange={(e)=>setemail(e.target.value)} value={email}></Input>
   <Input type="number"  mb="1rem" onChange={(e)=>setphoneNumber(e.target.value)} value={phoneNumber}></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={handleEdit}>Edit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
<Center>
<Card width={{lg:"450px",md:"400px",sm:"400px",base:"340px"}} padding="20px">
  <CardHeader>
    <Center>
    <Heading  fontWeight="bold" size='lg'>User Details</Heading>
    </Center>
  </CardHeader>

  <CardBody >
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='md' textTransform='uppercase'>
          Name
        </Heading>
        <Text  fontSize='md' pt='2' >
      {user?.name}
        </Text>
      </Box>
      <Box>
        <Heading size='md' textTransform='uppercase'>
          Email
        </Heading>
        <Text pt='2' fontSize='md'>
        {user?.email}
        </Text>
      </Box>
      <Box>
        <Heading size='md' textTransform='uppercase'>
         Phone Number
        </Heading>
        <Text pt='2' fontSize='md'>
        {user?.phoneNumber}
        </Text>
      </Box>
    </Stack>

  
      <Box   mt="20px" display="flex" justifyContent="center">
      <Button onClick={onOpen} width="60%"  fontSize="md" padding="20px" colorScheme='orange'>Edit</Button>
      </Box>
     

  </CardBody>
</Card>
</Center>
   </Box>}
   </>
  )
}
