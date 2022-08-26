 import React from "react"; 
 import MaskedInput from "react-text-mask"; 
 import { FormControl } from "react-bootstrap"; 
  
 export default function MaskedFormControl(props) { 
   return <FormControl as={MaskedInput} {...props} />; 
 } 