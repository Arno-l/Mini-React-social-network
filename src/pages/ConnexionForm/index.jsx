import React, { useState} from "react";
//import { useAtom } from "jotai";
//import { idAtom } from "atoms/atoms";
//import { jwtAtom } from "atoms/atoms";
import { useDispatch } from "react-redux";
import { login } from "stores/actions";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ConnexionForm = () => {


    //const [userId, setUserId] = useAtom(idAtom);
    //const [JWT, setJWT] = useAtom(jwtAtom);    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

      const handleSubmit = (e) => {
        //console.log(JSON.stringify(formData));
  
        const data = {
            identifier: document.getElementById("email").value,
            password: document.getElementById("password").value
        }


        const options = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };

      e.preventDefault(data)
     fetch('http://localhost:1337/auth/local', options)
        .then(function(res) {
            if (res.ok) {
                console.log(res)
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value)
            dispatch(login(value.jwt, value.user.id));
            setEmail(value.user.email);
            setPassword(value.user.password)
            //setJWT(value.jwt)
            //setUserId(value.user.id)
            Cookies.set('token',value.jwt, {
                sameSite: 'none',
                secure: true
            });
            Cookies.set('username', value.user.username, {
                sameSite: 'none',
                secure: true
            } );
            Cookies.set('id',value.user.id, {
                sameSite: 'none',
                secure: true
            });
            console.log(Cookies.get('id'))
            navigate("/");
        })}


    return (
        <>
        <div className="registration-form">
        <form>
            <label>Email :</label>
        <input id="email"  type="text" className="profil-input"  />
            <label>Mot de passe :</label>
        <input id="password" type="text" className="profil-input"  />
        <br/><br/><button onClick={handleSubmit}>Valider</button> 
        </form>
        </div>
        </>
    )
}

export default ConnexionForm;