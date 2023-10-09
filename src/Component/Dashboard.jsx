import { Box, Button, Card, CardBody, CardHeader, HStack, Heading, Select, Stack, StackDivider, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Searchbar } from './Searchbar';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import { Navbar } from './Navbar';
export const Dashboard = () => {

  const [users,setUsers]=useState([]);

const [addbtn,setAddbtn]=useState(false);
  
  const [filteredUsers,setFilteredUsers]=useState([]);

    const [search,setSearch] = useState("");

    const [filter,setFilter]=useState("");


    const getUsers=async()=>{

      try{
        const {data}=  await axios.get(`/users`)
        console.log(data);

        if(!data.error){
          setUsers(data)
        }

       
      }

      catch(err){
        console.log(err);;
      }


      
    }


    async function deleteUser(id){

      try{
        // await axios.delete(`http://localhost:8080/user/${id}`);

       setUsers(users.filter(user=>user._id!=id));

      }

      catch(err){

      }


     


    }






  useEffect(()=>{


if(!localStorage.getItem('users')){
  getUsers();

}
else{
  setUsers(JSON.parse(localStorage.getItem('users')));

  if(localStorage.getItem('filter')!=null){

    setFilter(JSON.parse(localStorage.getItem('filter')));
  }
}

  },[])


  const FilterData=()=>{

    let filterArr=users;

        console.log(filterArr);
console.log(search);
    if(search){
     
   filterArr= users.filter((user)=>{
    console.log(user.name);
    return (user.name==search || user.email==search || user.phoneNumber==search);
   });
   console.log(filterArr);
    }

 console.log(filter);

      if(filter=='A-Z'){

      filterArr=  filterArr.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if(filter=='Z-A'){

        
       filterArr= filterArr.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        console.log(filterArr);
      }

      if(filter=='Last updated'){

        filterArr = [...filterArr].sort((a, b) =>new Date( b.updatedAt) -  new Date(a.updatedAt));
      }

      if(filter=='Last created'){

        filterArr = [...filterArr].sort((a, b) => new Date( b.createdAt)-new Date( a.createdAt) );
      }

         console.log(filterArr);
      setFilteredUsers([...filterArr]);



    



  }


  useEffect(()=>{

    if(users){
      localStorage.setItem("users", JSON.stringify(users));
    }

  },[users])

  useEffect(()=>{

    if(users){

      if(filter){

      localStorage.setItem("filter", JSON.stringify(filter));
      }

     FilterData()

     

    }

  },[filter,users,search])
  const navigate=useNavigate()
console.log(filter,search,filteredUsers);


useEffect(()=>{
console.log("change in filteredUSERS",filteredUsers);
},[filteredUsers])

  return (
   <>
<Navbar/>
   <Box bg="lightyellow" minH="92vh" padding="20px">
  
<Searchbar setsearch={setSearch} FilterData={FilterData}/>
<HStack display='flex' justifyContent="space-between">
<Select value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder='Apply filter' width={{lg:"200px",md:"200px",sm:"130px",base:"130px"}}>
  <option value='A-Z'>A-Z</option>
  <option value='Z-A'>Z-A</option>
  <option value='Last created'>Last created</option>
  <option value='Last updated'>Last updated</option>
</Select>



<AddModal setUser={setUsers}/>
</HStack>


   <Box  display="flex" flexDir="row" flexWrap="wrap"  padding="20px" gap="1rem">

  
 { filteredUsers.map((user)=>(

<Card key={user._id}>
<CardHeader>
<Heading size='md'>{user.email}</Heading>
</CardHeader>

<CardBody>
  <Stack divider={<StackDivider />} spacing='4'>
    <Box>
      
      <Text pt='2' fontSize='sm'>
      {user.name}
      </Text>

      <Text pt='3'>
        {user.phoneNumber}
      </Text>
    </Box>
    <Box>
      <HStack display="flex" justifyContent="space-between">
    <Button onClick={()=>navigate(`/user/${user._id}`)}>View </Button>
    <DeleteModal name={user.name} setUser={setUsers} userId={user._id}></DeleteModal>
    </HStack>
    </Box>
  </Stack>
</CardBody>
</Card>

 )) 
 

}
</Box>
</Box>
   </>
  )
}


