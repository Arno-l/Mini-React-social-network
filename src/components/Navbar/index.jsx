import React from 'react';
import { Link } from 'react-router-dom';
//import { useAtom, useAtomValue } from 'jotai';
//import { jwtAtom } from 'atoms/atoms';
//import { userInfoAtom } from 'atoms/atoms'
import { useSelector, useDispatch } from 'react-redux';
import { login } from 'stores/actions';
import Cookies from 'js-cookie';

const Navbar = () => {

    //const [JWT, setJWT] = useAtom(jwtAtom);
    //const formData = useAtomValue(userInfoAtom);
    const jwt = useSelector((state) => state.token);
    const userId = useSelector((state) => state.id);
    const dispatch = useDispatch();

    function logOut() {
        Cookies.remove('token', {
            sameSite: 'none',
            secure: true
        });
        Cookies.remove('id', {
            sameSite: "none",
            secure: true
        })
        dispatch(login("",""));
       
    }


    return (
        <>
        <nav>
        <h1 id='title'>Mini React Social Network</h1>
        <Link to='/' className="nav-link">Accueil</Link>
        
        {jwt !== ""  ? 
        <>
        <Link to='/profile' className="nav-link">Mon profil</Link>
        <Link to='/login' className="nav-link" onClick={logOut}>Se déconnecter</Link>
        </>
        : 
        <>
        <Link to='/signin' className="nav-link">S'inscrire</Link>
        <Link to='/login' className="nav-link">Se connecter</Link>
        </>
        }
        </nav>
        {jwt !== "" &&
        <div className='home-msg'><p>{Cookies.get('username')}</p></div>
        }
        </>
    )
}

export default Navbar;