import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import RoutesApp from './routes/RoutesApp';

function App() {
  return (
      <BrowserRouter>    
          <div className="App">  
            <Navbar />
            <RoutesApp />
          </div>
      </BrowserRouter>
  );
}

export default App;
