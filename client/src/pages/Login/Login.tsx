import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, ButtonGroup, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";

export const Login = () => {
  const [values, setValues] = useState({
    password: '',
    email: '',
  });
  const { signIn } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    signIn(values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <div className="form-container">
        <Heading as='h3' size='md' marginBlock='1rem'>Iniciar Sesión</Heading>
        <form  className="form-register" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel marginTop='1rem'>Correo</FormLabel>
            <Input variant='filled' type="email" id="email-field" name="email" placeholder="Ingrese su correo" onChange={handleChange} />
            <FormLabel marginTop='1rem'>Contraseña</FormLabel>
            <Input variant='filled' type="password" id="password-field" name="password" placeholder="Ingresa tu contraseña" onChange={handleChange} />
            <ButtonGroup marginTop='1rem' display='flex' justifyContent='center'>
              <Button type="submit" marginTop='10px' colorScheme='whatsapp'>Submit</Button>
            </ButtonGroup>
          </FormControl>
        </form>
      </div>
    </>
  )
}