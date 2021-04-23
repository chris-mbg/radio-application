import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import UserContextProvider from "./contexts/UserContext";
import RadioContextProvider from "./contexts/RadioContext";
import FavouriteContextProvider from "./contexts/FavouriteContext";

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <RadioContextProvider>
            <FavouriteContextProvider>
              <Navbar />
              <h1>This is .App calling...</h1>
              <button>En knapp</button>
            </FavouriteContextProvider>
          </RadioContextProvider>
        </UserContextProvider>
      </Router>
     <Footer />
    </div>
  );
}

export default App;
