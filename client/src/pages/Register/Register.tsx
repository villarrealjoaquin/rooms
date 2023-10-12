import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const Register = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    email: '',
  });
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <h2>Registro</h2>
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
          <input type="text" placeholder="username" name="username" onChange={handleChange} />
          <input type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}