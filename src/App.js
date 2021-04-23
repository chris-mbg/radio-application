import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from "./contexts/UserContext";
import RadioContextProvider from "./contexts/RadioContext";

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <RadioContextProvider>
            <Navbar />
            <h1>This is .App calling...</h1>
            <button>En knapp</button>
          </RadioContextProvider>
        </UserContextProvider>
      </Router>
     <Footer />
    </div>
  );
}

export default App;
