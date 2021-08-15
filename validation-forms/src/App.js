import React, {useState} from 'react';
import { Form, Label,  ContButton, ContTerms, Button, MessageErr, MessageSuccess } from './elements/formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from './components/Input';

const App = () => {
  const [user, setUser] = useState({campo: '', valid: null});
  const [name, setName] = useState({campo: '', valid: null});
  const [password, setPassword] = useState({campo: '', valid: null});
  const [password2, setPassword2] = useState({campo: '', valid: null});
  const [email, setEmail] = useState({campo: '', valid: null});
  const [tel, setTel] = useState({campo: '', valid: null});
  const [terms, setTerms] = useState(false);
  const [formValid, setFormValid] = useState(null)

  const expressions = {
		user: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
		name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		tel: /^\d{7,14}$/ // 7 a 14 numeros.
	}

  const validPassword = () => {
    if(password.campo.length > 0){
      if(password.campo !== password2.campo){
        setPassword2((prevState) => {
          return {...prevState, valid: 'false'}
        })
      }else{
        setPassword2((prevState) => {
          return {...prevState, valid: 'true'}
        })
      }

    }
    
  }

  const handleChange = (e) => {
    setTerms(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(
      user.valid === 'true' && 
      name.valid === 'true' &&
      password.valid === 'true' &&
      password2.valid === 'true' &&
      email.valid === 'true' &&
      tel.valid === 'true' &&
      terms ){
        setFormValid(true);
        setUser({campo:'', valid: null})
        setName({campo:'', valid: null})
        setPassword({campo:'', valid: null})
        setPassword2({campo:'', valid: null})
        setEmail({campo:'', valid: null})
        setTel({campo:'', valid: null})
      }else{
        setFormValid(false);

      }



  }




  return(
    <main>
      <Form onSubmit={handleSubmit}>
        <Input
          state = {user}
          setState = {setUser}
          tipo= 'text'
          label='User'
          placeholder='Usuario' 
          name='usuario'
          legendErr= 'El usuario debe tener de 4 a 16 dígitos y solo puede contener numeros, letras y guíon bajo.'
          expressionRegular = {expressions.user}
        />
             
        <Input
          state = {name}
          setState = {setName}
          tipo= 'text'
          label='Nombre'
          placeholder='Ingrese su nombre' 
          name='usuario'
          legendErr= 'El nombre solo puede contener letras y espacios.'
          expressionRegular = {expressions.name}
        />
        <Input
          state = {email}
          setState = {setEmail}
          tipo= 'email'
          label='Correo Electrónico'
          placeholder='correoelectronico@mail.com' 
          name='email'
          legendErr= 'El correo sólo puede contener letras, números, puntos, guiones y guion bajo.'
          expressionRegular = {expressions.email}
        />
        <Input
          state = {password}
          setState = {setPassword}
          tipo= 'password'
          label='Contraseña'
          placeholder='Ingrese una contraseña' 
          name='password1'
          legendErr= 'La contraseña debe contener de 4 a 12 dígitos.'
          expressionRegular = {expressions.password}
        />
        <Input
          state = {password2}
          setState = {setPassword2}
          tipo= 'password'
          label='Repetir contraseña'
          placeholder='Repita contraseña' 
          name='password2'
          legendErr= 'Las contraseñas no coinciden.'
          funcion= {validPassword}
        />
        <Input
          state = {tel}
          setState = {setTel}
          tipo= 'number'
          label='N° telefónico'
          placeholder='Ingresar teléfono' 
          name='usuario'
          legendErr= 'El teléfono solo puede contener números con un mínimo de 7 dígitos y un máximo de 14.'
          expressionRegular = {expressions.tel}
        />
      
       
              
        <ContTerms>
          <Label>
            <input type='checkbox'
             name='terminos' 
             id='terminos' 
             checked={terms}
             onChange={handleChange}/>
                Acepto los Terminos y Condiciones
          </Label>
        </ContTerms>

        {formValid === false && <MessageErr>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <b>Error:</b> Por favor rellena el formulario correctamente.
          </p>          
        </MessageErr>}

        <ContButton>
          <Button type='submit'>Enviar</Button>
          {formValid === true && <MessageSuccess>El formulario se envió exitosamente!</MessageSuccess>}
              
        </ContButton>                
      </Form>
    </main>
  );
}



export default App;
