import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const GuardedRoute = (props) => {

  const { userLoggedIn } = useContext(UserContext);

  return userLoggedIn ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};

export default GuardedRoute;

