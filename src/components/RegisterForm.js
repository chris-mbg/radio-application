import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/RegisterForm.module.css"

const RegisterForm = () => {

  const { registerNewUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegSubmit = e => {
    e.preventDefault();
    const newUser = {
      email,
      firstName,
      lastName,
      password
    }
    //registerNewUser(newUser)
  }

  return (
    <div className={styles.registerForm}>
      <h2>Registera dig här!</h2>
          <form onSubmit={(e) => handleRegSubmit(e)}>
            <input
              type="email"
              placeholder="E-mail..."
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Förnamn..."
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Efternamn..."
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Välj ett lösenord..."
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Registera</button>
          </form>
    </div>
  );
};

export default RegisterForm;