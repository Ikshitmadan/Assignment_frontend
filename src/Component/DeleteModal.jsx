import { Box, Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'

export default function DeleteModal({name,setUser,userId}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
const toast=useToast()
    const [loading,setloading]=useState(false);


const [phoneNumber,setphoneNumber]=useState();
    const handleDeleteUser=async()=>{


    console.log(name,userId);

        try{

      
        setloading(true);

      const {data}=  await axios.delete(`/user/${userId}`);
console.log(data);
      if(!data.error){
        toast({
            title: 'User Delete',
            description: "Congrats user Deleted",
            status: 'success',
            position:'top',
            duration: 3000,
            isClosable: true,
          })

      }

      setUser((prev)=>prev.filter((user)=>user._id!=userId));

      setloading(false);

      
      onClose()
        }

        catch(err){

console.log(err);

        }


    }
  
    return (
      <>
        
  
        <Button colorScheme="red"  onClick={onOpen}>
         Delete 
        </Button>
        <Modal  finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent  width={{lg:"500px",md:"450px",sm:"330px",base:"330px"}}>
            <ModalHeader>Are you sure you wish to delete user-{name}</ModalHeader>
            <ModalCloseButton />
         
            <ModalFooter display="flex" justifyContent="space-between">
              <Button  colorScheme='red' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button  onClick={()=>handleDeleteUser()}  colorScheme='purple'>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
