
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import HomePage from './screens/HomePage/HomePage';
import SubmitSuccessful from 'screens/SubmitSuccessful/SubmitSuccessful';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/form-submitted" element={<SubmitSuccessful />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>

      {/* Toasty Configuration */}
      <ToastContainer
        style={{ fontSize: 16 }}
        autoClose={false}
        hideProgressBar
        draggable
        closeButton
        closeOnClick
        position='top-right'
      />
    </BrowserRouter>
  );
}

export default App;
