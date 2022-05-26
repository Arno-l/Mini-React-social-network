import  {React, useState } from 'react';
import Cookies from 'js-cookie';
//import { useAtom } from 'jotai';
//import { jwtAtom } from 'atoms/atoms';
//import { userInfoAtom } from 'atoms/atoms';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from 'stores/actions';
const RegistrationForm = () => {


      //const [formData, setFormData] = useAtom(userInfoAtom);
      //const [JWT, setJWT] = useAtom(jwtAtom);
      const [newUsername, setNewUsername] = useState("");
      const [newEmail, setNewEmail] = useState(""); 
      const [newPassword, setNewPassword] = useState("");
      const navigate = useNavigate();
      const dispatch = useDispatch();

      /*const handleChange = (e) => {
        setFormData({
          ...formData,
    
          // Trimming any whitespace
          [e.target.name]: e.target.value.trim()
        });
      }; */


        function handleSubmit(e) {
        e.preventDefault();
        setNewUsername(document.getElementById("username").value);
        setNewEmail(document.getElementById("email").value);
        setNewPassword(document.getElementById("password").value);
        //console.log(JSON.stringify(formData));
  
        const data = {
      username: document.getElementById("username").value,
      email:document.getElementById("email").value,
      password: document.getElementById("password").value
        }


        const options = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };

     fetch('http://localhost:1337/auth/local/register', options)
        .then(function(res) {
            if (res.ok) {
                //console.log(res)
                return res.json();
            }
        })
        .then(function(value) {
            //setJWT(value.jwt);
            console.log(value.user.username)
            dispatch(login(value.jwt, value.user.id));
            Cookies.set('token', value.jwt, {
                sameSite: 'none',
                secure: true
            });
            Cookies.set('username', value.user.username, {
                sameSite: 'none',
                secure: true
            } );
            Cookies.set('id', value.user.id, {
                sameSite: 'none',
                secure: true
            } )
            console.log(value);
            console.log(Cookies.get())
            //console.log(formData)
            navigate("/");
        })}



    return (
        <>
        <div className="registration-form">
        <form>
            <label>Pseudo :</label>
        <input id="username"  type="text" className="profil-input" />
            <label>Email :</label>
        <input id="email" type="text" className="profil-input"  />
            <label>Mot de passe :</label>
        <input id="password" type="text" className="profil-input" />
        <br/><br/><button onClick={handleSubmit}>Valider</button> 
        </form>
        </div>
        </>
    )
}

export default RegistrationForm;