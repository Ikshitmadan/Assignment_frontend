import { Alert, Box, Button, Radio, RadioGroup, Select, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export const Register = () => {

    const cities=['Gujarat','Maharashtra','Karnataka'];

    const [stateText,setStateText]=useState("");
const [suggestedCities,setSuggesstiveCities] = useState([]);
    const navigate=useNavigate();
    function suggestions(event){
console.log("hello", "insode suggestions");
   setStateText(event.target.value);
           
    console.log(stateText);

 
    let tempArr=[];

   tempArr= cities.filter((city)=>{
return city.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
console.log(tempArr);


    setSuggesstiveCities(tempArr);



    }

    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [name,setname]=useState("");

    const [state,setstate]=useState("");

    const [city,setcity]=useState("");

    const [gender,setgender]=useState("");

    const [related,setrelated]=useState("");
    const [phone,setphone]=useState("");



   async function submit(){

  try{
    let flag=false;
        if(!phone){

            alert('Please enter phone number');
        }

        if(!name){
            alert('Please enter name')
        }

       if(!email){

        alert('email not found');

       }

       if(!stateText){

        alert('stateText not found');

       }

       if(!state){
        alert(`state not found`)
       }


       if(!password){
        alert('password not found')
       }

       if(!related){
        alert('related not found');

       }

       if(!gender){
        alert('gender not found');
       }


        if(email &&  name && email && password && related && state && stateText && phone && gender ){
const userDATA={
  name,
  email,
  password,
  related,
  state,
 city: stateText,
 phoneNumber: phone,
  gender}

  console.log(userDATA);
          
      const {data}=  await axios.post('/signup',{
        name,
        email,
        password,
        related,
        state,
       city: stateText,
       phoneNumber: phone,
        gender
      })

            // axif(ios call 

            if(!data.error){

              navigate('/login');
              
            }
        }
        else{

alert("pls enter all required values");
            return 
        }




  }

  catch(error){
    console.log(error);
  }



    }




 







  return (
   
<Box bg="lightblue" minH='100vh'  display='flex'  alignItems='center' justifyContent='center'>

    <Box bg="white" borderRadius="5px"  padding="20px" boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;" className='container'  maxWidth="90%" display='flex' flexDirection='column' justifyContent='center' width={{lg:"500px",md:"450px"}} gap={{lg:"1rem",md:"1rem",sm:"0.5rem",base:"0.5rem"}} >
<Input  onChange={(e)=>setname(e.target.value)} borderRadius="5px" padding="10px" type='text' placeholder=' Name'></Input>

<Input borderRadius="7px" onChange={(e)=>setemail(e.target.value)}  padding="10px" type='email' placeholder='Email'></Input>
<Input borderRadius="7px" onChange={(e)=>setpassword(e.target.value)}  padding="10px" type='password' placeholder='password'></Input>
<Input padding="10px"  onChange={(e)=>setphone(e.target.value)} type ="number"  placeholder='phone number'></Input>
  <Text>Gender</Text>
<RadioGroup  colorScheme='orange'>
  <Stack spacing={4} direction='row'>
    <Radio size="md" value='Male'  onClick={()=>setgender("Male")}>
     Male
    </Radio>
    <Radio   onClick={()=>setgender('Female')}  size="md" value='Female'>Female</Radio>
    <Radio  onClick={()=>setgender('others')} size="md" value='3'>others</Radio>
  </Stack>
</RadioGroup>
 <Text>How did you learn about us</Text>
<RadioGroup   colorScheme='purple'>
  <Stack spacing={4} direction='row' flexWrap="wrap">
    <Radio size="md" value='Linkedin'  onClick={(e)=>setrelated('Linkedin')} >
    Linkedin
    </Radio>
    <Radio  onClick={(e)=>setrelated('Friends')}size="md"  value='Friends'>Friends</Radio>
    <Radio onClick={(e)=>setrelated('Job-Portal')} size="md"  value='Job-Portal'>Portal</Radio>
    <Radio onClick={(e)=>setrelated('others')}  size="md" value='others'>others</Radio>
  </Stack>
</RadioGroup>
   <Text>State</Text>
   <Select   onChange={(event)=>setstate(event.target.value)} placeholder='Select state'>
  <option value='Mumbai'>Mumbai</option>
  <option value='Pune'>Pune</option>
  <option value='Ahmedabad'>Ahmedabad</option>
</Select>

<Box>
<Input    value={stateText} type ="text" placeholder="city" onChange={suggestions}/>

<Box>
{ stateText &&  suggestedCities
.filter(ci=>ci!=stateText).map((city)=>
<Box  cursor="pointer" key={city}>
<Text onClick={()=>setStateText(city)} padding="4px">{city}</Text>
</Box>
)

}
</Box>

</Box>
<Button colorScheme='orange' onClick={submit}>Register</Button>
    </Box>



    </Box>
  )
}
