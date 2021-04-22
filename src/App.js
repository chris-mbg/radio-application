import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <h1>This is .App calling...</h1>
        <button>En knapp</button>
      </Router>
     <Footer />
    </div>
  );
}

export default App;
