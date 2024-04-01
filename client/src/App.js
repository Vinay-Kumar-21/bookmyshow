import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


//styles
import "./stylesheets/alignments.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/custom.css";
import "./stylesheets/sizes.css";
import "./stylesheets/theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
