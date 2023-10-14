import { Button, ButtonGroup, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const Register = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    email: '',
  });
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    signUp(values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  };

  return (
    <>
      <div className="form-container">
        <Heading as='h3' size='md' marginBlock='1rem'>Registro</Heading>
        <form className="form-register" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel marginTop='1rem'>Usuario</FormLabel>
            <Input type="text" variant='filled' placeholder="Ejemplo: usuario123" name="username" onChange={handleChange} />
            <FormLabel marginTop='1rem'>Correo</FormLabel>
            <Input variant='filled' type="email" placeholder="Ejemplo: ejemplo@correo.com" name="email" onChange={handleChange} />
            <FormLabel marginTop='1rem'>Contraseña</FormLabel>
            <Input variant='filled' type="password" placeholder="Ingresa tu contraseña" name="password" onChange={handleChange} />
            <ButtonGroup marginTop='1rem' display='flex' justifyContent='center'>
              <Button type="submit" marginTop='10px' colorScheme='whatsapp'>Submit</Button>
            </ButtonGroup>
          </FormControl>
        </form>
      </div>
    </>
  )
}