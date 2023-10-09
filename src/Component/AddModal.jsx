import { Box, Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'

export default function AddModal({setUser}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
const toast=useToast()
    const [loading,setloading]=useState(false);

const [name,setname]=useState();
const[email,setemail]=useState();
const [phoneNumber,setphoneNumber]=useState();
    const handleAddUser=async()=>{
console.log(email,phoneNumber,email);
        if(!email || !phoneNumber|| !name){

            toast({
                title: 'Invalid info',
                description: 'Please enter all details',
                status: 'warning',
                position:'top',
                duration: 3000,
                isClosable: true,
              })

              return;
        }

        try{

      
        setloading(true);
const UserData={
    name,
    email,
    phoneNumber
}
      const {data}=  await axios.post('/user',UserData);
console.log(data);
      if(!data.error){
        toast({
            title: 'User created',
            description: "Congrats user created",
            status: 'success',
            position:'top',
            duration: 3000,
            isClosable: true,
          })

      }

      setUser((prev)=>[...prev,data]);

      setloading(false);

      
      onClose()
        }

        catch(err){



        }


    }
  
    return (
      <>
        
  
        <Button colorScheme="purple" mt={4} onClick={onOpen}>
          Add Users
        </Button>
        <Modal  finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent  width={{lg:"500px",md:"450px",sm:"330px",base:"330px"}}>
            <ModalHeader>Add a new User</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
        <VStack gap="1rem">
               <Input onChange={(e)=>setname(e.target.value)} padding={{lg:"25px",md:"20px",sm:"20px",sm:"15px"}} type='text' placeholder='name'></Input> 
              <Input  onChange={(e)=>setemail(e.target.value)} padding={{lg:"25px",md:"20px",sm:"20px",sm:"15px"}} type="email" placeholder='email'></Input> 


              <Input  onChange={(e)=>setphoneNumber(e.target.value)} padding={{lg:"25px",md:"20px",sm:"20px",sm:"15px"}} type='number' placeholder='phoneNumber'></Input> 
              </VStack>
            </ModalBody>
  
            <ModalFooter display="flex" justifyContent="space-between">

       
              <Button  colorScheme='red' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button  onClick={handleAddUser}  colorScheme='purple'>Save</Button>

           
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
