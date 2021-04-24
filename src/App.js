import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserContextProvider from "./contexts/UserContext";
import RadioContextProvider from "./contexts/RadioContext";
import FavouriteContextProvider from "./contexts/FavouriteContext";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import ProgramPage from "./pages/ProgramPage";

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <RadioContextProvider>
            <FavouriteContextProvider>
              <Navbar />
              <Route exact path="/" component={Home} />
              <Route exact path="/program/:programId" component={ProgramPage} />
              <Route exact path="/user" component={UserPage} />
            </FavouriteContextProvider>
          </RadioContextProvider>
        </UserContextProvider>
      </Router>
     <Footer />
    </div>
  );
}

export default App;
