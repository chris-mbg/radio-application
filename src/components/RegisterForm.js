import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/RegisterForm.module.css";

const RegisterForm = ({hideModal}) => {
  const { registerNewUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState({});

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
  const containDigitRegex = /\d/;
  const numberOfCharsRegex = /^.{6,}$/;
  const capLetterRegex = /[A-Z]/;
  const notCapLetterRegex = /[a-z]/;
  const whitespaceRegex = /\s/;
  const specCharsRegex = /[^a-zA-Z0-9]/;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const passwordRequirements = {};
    if (containDigitRegex.test(e.target.value)) passwordRequirements.digit = true;
    if (numberOfCharsRegex.test(e.target.value)) passwordRequirements.numberChars = true;
    if (capLetterRegex.test(e.target.value)) passwordRequirements.capLetter = true;
    if (notCapLetterRegex.test(e.target.value)) passwordRequirements.notCapLetter = true;
    if (!whitespaceRegex.test(e.target.value)) passwordRequirements.noWhitespace = true;
    if (specCharsRegex.test(e.target.value)) passwordRequirements.specChars = true;
    setPasswordCheck(passwordRequirements);
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    const passwordOK = passwordRegex.test(password);
    console.log('Password OK?', passwordOK);
    if(!passwordOK) {
      return
    } else {
      const newUser = {
        email,
        firstName,
        lastName,
        password,
      };
      const result = await registerNewUser(newUser);
      if(result.success) {
        hideModal();
      }
    }
  };

  return (
    <div className={styles.registerForm}>
      <h2>Registera</h2>
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
          onChange={handlePasswordChange}
        />
        <div className={styles.passwordCheckContainer}>
          <p>Lösenordet innehåller:</p>
          <div className={styles.answersWrapper}>
            <p className={passwordCheck.numberChars ? styles.fulfilled : styles.notOK}>Minst 6 tecken</p>
            <p className={passwordCheck.digit ? styles.fulfilled : styles.notOK}>Minst en siffra</p>
            <p className={passwordCheck.notCapLetter ? styles.fulfilled : styles.notOK}>Minst en gemen</p>
            <p className={passwordCheck.capLetter ? styles.fulfilled : styles.notOK}>Minst en versal</p>
            <p className={passwordCheck.specChars ? styles.fulfilled : styles.notOK}>Minst ett specialtecken</p>
            <p className={passwordCheck.noWhitespace ? styles.fulfilled : styles.notOK}>Inga mellanslag</p>
          </div>
        </div>
        <button type="submit">Registera</button>
      </form>
    </div>
  );
};

export default RegisterForm;
