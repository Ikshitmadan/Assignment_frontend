
import { Box, Button, HStack, Input } from '@chakra-ui/react'
import React from 'react'

export const Searchbar = ({setsearch,FilterData}) => {

    console.log(setsearch);
    console.log(FilterData);
  return (
    <HStack  mt="10px" gap="0px" marginBottom="1rem" >
        <Input variant='unstyled' height="40px"
 onChange={(e)=>setsearch(e.target.value)} width={{lg:"40%",md:""}} border="1px solid grey" padding="1rem" placeholder='search attribute'>
        </Input>

        <Button  height="40px" onClick={()=>FilterData()} marginLeft="-50px" colorScheme="green" width={{lg:"10%",md:"10%",sm:"20%",base:"20%"}}>Search</Button>


    </HStack>
  )
}


