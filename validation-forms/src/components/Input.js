import React from 'react';
import {GroupInput, LegendErr, IconValidation, Label, Input} from './../elements/formularios';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const InputComponent = ({state, setState, tipo,label, placeholder, name, legendErr, expressionRegular, funcion }) => {

  const handleChange = (e) => {
    setState({...state, campo: e.target.value});
  }

  const handleValidation = () => {
    if(expressionRegular){
      if(expressionRegular.test(state.campo)){
        setState({...state, valid: 'true'})
      }else{
        setState({...state, valid: 'false'})
        
      }
    }
    if(funcion){
      funcion();

    }
  }


    return(
        <div>         
          <Label htmlFor={name} valid={state.valid}>{label}</Label>
            <GroupInput>
              <Input 
              type={tipo} 
              placeholder={placeholder}
              id={name}
              value={state.campo}
              onChange={handleChange}
              onKeyUp={handleValidation}
              onBlur={handleValidation}
              valid={state.valid}              
              />
              <IconValidation 
              icon={ state.valid === 'true' ? faCheckCircle : faTimesCircle}
               valid={state.valid}/>
            </GroupInput>
            <LegendErr valid={state.valid}>{legendErr}</LegendErr>
          </div>
    )
}

export default InputComponent;