import { Box, Button, Group, NumberInput, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'
import { validateString } from '../../utils/Common'

function BasicDetails({propertyDetails,setPropertyDetails,prevStep,nextStep}) {
    const form=useForm({
        initialValues:{
        title:propertyDetails.title,
        desription:propertyDetails.description,
        price:propertyDetails.price,}
    ,
    validate:{
        title:(value)=>validateString(value),
        description:(value)=>validateString(value),
        price:(value)=>value<1000?"Must be greater than 999":null
    },
})
const {title,description,price}=form.values
const handleSubmit=()=>{
    const{hasErrors}=form.validate()
    if(!hasErrors){
        setPropertyDetails((prev)=>({...prev,title,description,price}))
        nextStep()
    }
}
const handlenext=()=>{
    setPropertyDetails((prev)=>({...prev,title,description,price}))
    nextStep()
}
  return (
   <Box maw="50%" mx="auto" my="md">
    <form
    onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()
    }}
    >
<TextInput
withAsterisk
label="Title"
placeholder='Property Name'
required
{...form.getInputProps("title")}
/>
<Textarea
placeholder="Description" 
label="Description"
withAsterisk
required
{
    ...form.getInputProps("description")
}
/>
<NumberInput
    withAsterisk
    label="Price"
    placeholder='1000'
    min={0}
    required
    {...form.getInputProps("price")}
/>
 <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={handlenext}>Next Step</Button>
      </Group>
    </form>
   </Box>
  )
}

export default BasicDetails