import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

//pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';


//styles
import "./stylesheets/alignments.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/custom.css";
import "./stylesheets/sizes.css";
import "./stylesheets/theme.css";

//components
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const { loading } = useSelector((state) => state.loaders)
  return (
    <>
      {loading && (
        <div className='loader-parent'>
          <div className='loader'></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
          <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
