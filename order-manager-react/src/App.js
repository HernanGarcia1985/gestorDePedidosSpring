import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import NavbarCustom from './components/NavbarCustom';
import RoutesApp from './routes/RoutesApp';

function App() {
  return (
      <BrowserRouter>    
          <div className="App">  
            <NavbarCustom />
            <RoutesApp />
          </div>
      </BrowserRouter>
  );
}

export default App;
