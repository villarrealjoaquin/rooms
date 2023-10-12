import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const [values, setValues] = useState({
    password: '',
    email: '',
  });
  const { signIn } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      <div>
        <h2 >Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" value={values.email} placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" value={values.password} placeholder="Contraseña" name="password" onChange={handleChange} />
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}