import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@presentation/App.css';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
