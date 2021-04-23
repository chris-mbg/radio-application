import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../css/LoginForm.module.css'

const LoginForm = () => {

  const { logInUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogInSubmit = e => {
    e.preventDefault();
    logInUser({
      email,
      password
    })
  };

  return (
    <div className={styles.loginForm}>
      <h2>Logga in</h2>
        <form onSubmit={(e) => handleLogInSubmit(e)}>
          <input
            type="email"
            placeholder="E-mail..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Lösenord..."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Logga in</button>
        </form>
      </div>
  );
}

export default LoginForm;