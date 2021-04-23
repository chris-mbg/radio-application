import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <Navbar />
          <h1>This is .App calling...</h1>
          <button>En knapp</button>
        </UserContextProvider>
      </Router>
     <Footer />
    </div>
  );
}

export default App;
