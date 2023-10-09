import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
    const zIndices = {
        zIndices: {
          hide: -1,
          auto: 'auto',
          base: 0,
          docked: 10,
          dropdown: 1000,
          sticky: 1100,
          banner: 1200,
          overlay: 1300,
          modal: 1400,
          popover: 1500,
          skipLink: 1600,
          toast: 1700,
          tooltip: 1800,
        },
      }
    const navigate=useNavigate();

    const handleLogout=async()=>{
  const {data} =  await axios.post('/logout',{}, {withCredentials: true});
        navigate('/login');

        localStorage.clear();

    }

  return (
   <Box width="100%" bgColor="blue.300" 
   padding="20px" height="8vh" display="flex"
   justifyContent="flex-end"

   alignItems="center"
   >
<Button colorScheme='orange' onClick={handleLogout}>Logout</Button>
   </Box>
  )
}
