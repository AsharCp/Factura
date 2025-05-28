import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Invoice from './Pages/Invoice';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' Component={Home}></Route>
      <Route path='/invoice' Component={Invoice}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
