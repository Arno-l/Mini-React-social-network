import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegistrationForm from './pages/RegistrationForm';
import MyProfile from 'pages/profil';
import ConnexionForm from 'pages/ConnexionForm';
import { Provider } from 'react-redux';
import store from 'stores/users';


const App = () => {

    return (
        <>
    <Provider store={store}>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<RegistrationForm />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/login" element={<ConnexionForm />} />
        </Routes>
    </Provider>
        </>
    )
}

export default App;